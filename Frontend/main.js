const selectDate = document.querySelector('#selectdate');
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const fetchAttendance=document.querySelector('#fetchbutton')
const displayAttendance = document.querySelector('#displayAttendance');

fetchAttendance.addEventListener('click', async () => {
    try {
      
      const response = await axios.get('http://localhost:3000/get-all-attendance');
  
     
      const allAttendanceData = response.data;
  
      
      const memberAttendance = {};
  
      
      allAttendanceData.forEach((record) => {
        const date = record.date;
        for (const member in record) {
          if (member !== 'date') {
            if (!memberAttendance[member]) {
              memberAttendance[member] = { totalDays: 0, presentDays: 0 };
            }
            memberAttendance[member].totalDays++;
            if (record[member] === 'present') {
              memberAttendance[member].presentDays++;
            }
          }
        }
      });
  
    
      displayAttendance.innerHTML = '<h3>Attendance Summary</h3>';
      for (const member in memberAttendance) {
        const memberInfo = memberAttendance[member];
        const percentage = (memberInfo.presentDays / memberInfo.totalDays) * 100;
        displayAttendance.innerHTML += `<p class="attendance-info">${member}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${memberInfo.presentDays}/${memberInfo.totalDays}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (${percentage.toFixed(2)}%)</p>`;
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  });

search.addEventListener('click', () => {
    const previousAttendance = JSON.parse(localStorage.getItem(selectDate.value));
    if (previousAttendance) {
        showAttendance(previousAttendance);
    } else {
        showForm();
    }
});
function showForm() {
    displayAttendance.innerHTML=""
    form.innerHTML = `
    <div>
        faizan <input type="radio" class="faizan" name="faizan" value="present">Present
        <input type="radio" class="faizan" name="faizan" value="Absent">Absent
        </div>
        <div>
        rizwan <input type="radio" class="rizwan" name="rizwan" value="present">Present
        <input type="radio" class="rizwan" name="rizwan" value="Absent">Absent
        </div>
        <div>
        shivani <input type="radio" class="shivani" name="tabish" value="present">Present
        <input type="radio" class="shivani" name="shivani" value="Absent">Absent
        </div>
        <div>
        priya <input type="radio" class="priya" name="priya" value="present">Present
        <input type="radio" class="priya" name="priya" value="Absent">Absent
        </div>
        <div>
        virat <input type="radio" class="virat" name="virat" value="present">Present
        <input type="radio" class="virat" name="virat" value="Absent">Absent
        </div>
        <div>
        mahi <input type="radio" class="mahi" name="mahi" value="present">Present
        <input type="radio" class="mahi" name="mahi" value="Absent">Absent
        </div>
        <div>
            Adnan <input type="radio" class="Adnan" name="Adnan" value="present">Present
            <input type= "radio" class="Adnan" name="Adnan" value="Absent">Absent
        </div>
        <button type="submit">Mark attendance</button>
    `;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = selectDate.value;
    
    const faizanRadioButtons = document.querySelectorAll('.faizan');
    const rizwanRadioButtons = document.querySelectorAll('.rizwan');
    const shivaniRadioButtons = document.querySelectorAll('.shivani');
    const priyaRadioButtons = document.querySelectorAll('.priya');
    const viratRadioButtons = document.querySelectorAll('.virat');
    const mahiRadioButtons = document.querySelectorAll('.mahi');
    const AdnanRadioButtons = document.querySelectorAll('.Adnan');
    
    

    const faizanAttendance = extractAttendance(faizanRadioButtons);
    const rizwanAttendance = extractAttendance(rizwanRadioButtons);
    const shivaniAttendance = extractAttendance(shivaniRadioButtons);
    const priyaAttendance = extractAttendance(priyaRadioButtons);
    const viratAttendance = extractAttendance(viratRadioButtons);
    const mahiAttendance= extractAttendance(mahiRadioButtons);
    const adnanAttendance= extractAttendance(AdnanRadioButtons);

    const attendanceRecord = {
        date: date,
        faizan:faizanAttendance,
        rizwan:rizwanAttendance,
        shivani:shivaniAttendance,
        priya:priyaAttendance,
        virat:viratAttendance,
        mahi:mahiAttendance,
        Adnan:adnanAttendance
    };
    console.log(attendanceRecord)

    localStorage.setItem(date, JSON.stringify(attendanceRecord));

    axios.post('http://localhost:3000/insert-attendance', attendanceRecord).then(() => {
        form.innerHTML = '';
        getAttendance(date);
    });
});



function extractAttendance(radiobuttons) {
    for (let button of radiobuttons) {
        if (button.checked) {
            return button.value;
        }
    }
}
function getAttendance(date) {
    axios.get(`http://localhost:3000/get-attendance/${date}`).then((res) => {
        const attendance = res.data;
        console.log(attendance)
        showAttendance(attendance);
    })
}

function showAttendance(attendance) {
    displayAttendance.innerHTML = `
    faizan:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${attendance.faizan} <br>
    rizwan:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${attendance.rizwan} <br>
    shivani:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${attendance.shivani} <br>
    priya: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${attendance.priya} <br>
    virat:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${attendance.mahi} <br>
    mahi: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${attendance.virat} <br>
    Adnan:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${attendance.Adnan}`;
}
