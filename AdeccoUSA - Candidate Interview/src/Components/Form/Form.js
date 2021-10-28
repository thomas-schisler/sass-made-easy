import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './Form.css';
import moment from "moment";
import axios from "axios";
import Data from "../../data/data.json";

const Form = () => {
  // ***********************************************
  // get job id from query string 
  // ***********************************************
  const query = new URLSearchParams(useLocation().search); 
  const jobId = query.get('id'); // use ID from URL  
  const candidateId = query.get('candidate'); // use candidate from URL  
  const startTime = '';

  // ***********************************************
  // match ID from URL to JobId from JSON
  // ***********************************************
  const jobsURL = `http://localhost:8000/jobs/${jobId}`; // local testing 
  // const jobsURL = `https://opensheet.vercel.app/1DwnduehbWMZvrHv7gP0LbicKQrKYn9niPHGYRiZvpyE/DATA/${jobId}`; // uat testing 

  // ***********************************************
  // create appointment 
  // ***********************************************
  const appointmentURL = `http://localhost:1337/bhgatewayqa.azurewebsites.net/ca/ags/d00d7224567448908769a002fb2c7a55/createAppointment/`;
  // const appointmentURL = `http://jsonplaceholder.typicode.com/todos`;

  // ***********************************************
  // set state
  // ***********************************************
  const [info,setInfo] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [isError,setIsError] = useState(false)
  const [isSubmitted,setIsSubmitted] = useState(false)

  const [jobAddress1,setJobAddress1] = useState([])
  const [jobAddress2,setJobAddress2] = useState([])
  const [jobCity,setJobCity] = useState([])
  const [jobState,setJobState] = useState([])
  const [jobPostal,setJobPostal] = useState([])
  const [jobStartTime,setJobStartTime] = useState([])
  const [jobEndTime,setJobEndTime] = useState([])
  const [formStartTime,setFormStartTime] = useState([])
  const [formEndTime,setFormEndTime] = useState([])
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [communicationMethod, setCommunicationMethod] = useState('');
  const [location, setLocation] = useState('');

  // ***********************************************
  // time slots
  // ***********************************************
  const duration = 30; // units set below  
  const units = 'm'; // [h]ours, [m]inutes, [s]econds
  const start = moment( jobStartTime, ["h:mmA z"]).subtract(duration, units); // start time minus duration
  const end = moment(jobEndTime, ["h:mmA z"]).subtract((duration*2), units); // end time minus duration * 2
  const timeSlots = [];
  while (start.isSameOrBefore(end)) {
    const time = start.add(duration, units).format('h:mm A');
    timeSlots.push(<option key={time} value={time}>{time}</option>);
  }

  useEffect(() => {
    const fetchJSON = async () => {
      try {
        // const response = await axios.get(jobsURL)
        const response = await axios({
          method: 'GET',
          url: jobsURL, 
        })
        setInfo(response.data)
        setJobAddress1(response.data.address1);
        setJobAddress2(response.data.address2);
        setJobCity(response.data.city);
        setJobState(response.data.state);
        setJobPostal(response.data.postal);
        setJobStartTime(response.data.availableStartTime);
        setJobEndTime(response.data.availableEndTime);
        setFormStartTime(moment( jobStartTime, ["h:mmA z"]).format("HH:mm"));
        setFormEndTime(moment( jobEndTime, ["h:mmA z"]).format("HH:mm"));
        setIsError(false)
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log(`Error: ${error.message}`);
        }
        console.log(error.config);
        setIsError(true)
      }
      setIsLoading(false)
    }
    // mimic slow load time 
    // setTimeout(() => {
      fetchJSON();      
    // }, 2500);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();    
    const startTime = moment( date +' '+ time).unix();
    
    // dino's example 
    // const submission = {
    //   "candidateId": "c5cca566-cc49-4975-b2a1-b5f2e8777dfa",
    //   "jobId": "CA_EN_1_026520_1666403",
    //   "startTime": 1631908812,
    //   "communicationMethod": "Phone",
    //   "location": "Starbucks"
    // };
    
    // pulled form submission 
    const submission = { candidateId, jobId, startTime, communicationMethod, location };
    // console.log(submission);
    // alert(JSON.stringify(submission));
    try {
      const response = await axios.post(appointmentURL, submission);
      console.log(submission);
      console.log(response);
      // setIsSubmitted(true)
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  } 

  return (
    <>

      {/* error message */}
      { isError && <div className="message error">There's been an error, try again later.</div> }

      {/* loading message */}
      { isLoading && <div className="message loading">Loading...</div> }

      {/* submitted message */}
      { isSubmitted && <div className="message submitted">Thanks for your submission. You'll hear from a member of our team shortly.</div>  }

      {/* done loading without errors*/}
      { !isLoading && !isError && !isSubmitted && 
      <section className="job-info">
        <aside className="job-form">
          {/* JobId */}
          <p><strong>JobId</strong>:<br /> {jobId}</p>

          {/* Start & End Time */}
          <p><strong>Available Times</strong>:<br /> {jobStartTime} - {jobEndTime}</p>

          {/* Branch Adress */}
          <p><strong>Branch Adress</strong>:<br /> {jobAddress1} {jobAddress2}<br /> {jobCity}, {jobState} {jobPostal}</p>

        </aside>

        {/* form */}
        <form onSubmit={handleSubmit} aria-label="Request Time">
          
          <div className="form-field date-field">
            <label htmlFor="chooseDate">Date</label>
            <input type="date" id="chooseDate" name="chooseDate" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="form-field time-field">
            <label htmlFor="chooseTime">Time (30 Minutes Slots)</label>
            <select id="chooseTime" name="chooseTime" onChange={(e) => setTime(e.target.value)} required>
              <option value=""></option>
              {timeSlots}
            </select>
          </div>
          
          <div className="form-field dropdown-field">
            <label htmlFor="communicationMethod">How would you like to be contacted?</label>
            <select id="communicationMethod" name="communicationMethod" required value={communicationMethod} onChange={(e) => setCommunicationMethod(e.target.value)}>
              <option value=""></option>
              <option value="Phone">Phone</option>
              <option value="Onsite Appointment">Onsite Appointment</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>
          
          <div className="form-field location-field">
            <label htmlFor="chooseLocation">Location</label>
            <input type="text" id="chooseLocation" name="chooseLocation" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <input type="hidden" id="candidateId" value={candidateId} />
          <input type="hidden" id="jobId" value={jobId} />
          <input type="hidden" id="startTime" value={startTime} />
          

          <input value="Request Time" type="submit" name="Request Time" />

        </form>

      </section>
      }
        
    </>
  )
}

export default Form