import { useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  let faceio;
  let navigate = useNavigate();

  useEffect(() => {
    faceio = new faceIO(import.meta.env.VITE_FACEIOID);
  }, []);

  function enrollNewUser() {
    // Start the facial enrollment process
    faceio
      .enroll({
        locale: 'auto', // Default user locale
        enrollIntroTimeout: 8,
        payload: {
          /* The payload we want to associate with this particular user which is forwarded back to us upon future authentication of this user.*/
          whoami: 123456, // Dummy ID linked to this particular user
          email: 'john.doe@example.com',
        },
      })
      .then((userInfo) => {
        // User Successfully Enrolled!
        navigate(`/welcome`);
        console.log(userInfo);
        // handle success, save the facial ID (userInfo.facialId), redirect to the dashboard...
      })
      .catch((errCode) => {
        // Something went wrong during enrollment, log the failure
        handleError(errCode);
      });
  }

  function authenticateUser() {
    // Facial Authentication - Identify a previously enrolled user
    faceio
      .authenticate({
        locale: 'auto', // Default user locale
      })
      .then((userData) => {
        navigate(`/welcome`);
        console.log('Success, user identified');
        // Grab the facial ID linked to this particular user which will be same
        // for each of his successful future authentication. FACEIO recommend
        // that your rely on this Facial ID if you plan to uniquely identify
        // all enrolled users on your backend for example.
        console.log('Linked facial Id: ' + userData.facialId);
        // Grab the arbitrary data you have already linked (if any) to this particular user
        // during his enrollment via the payload parameter of the enroll() method.
        console.log('Associated Payload: ' + JSON.stringify(userData.payload)); // {"whoami": 123456, "email": "john.doe@example.com"} from the enroll() example above
      })
      .catch((errCode) => {
        handleError(errCode);
      });
  }

  function handleError(errCode) {
    // Log all possible error codes during user interaction..
    // Refer to: https://faceio.net/integration-guide#error-codes
    // for a detailed overview when these errors are triggered.
    switch (errCode) {
      case fioErrCode.PERMISSION_REFUSED:
        console.log('Access to the Camera stream was denied by the end user');
        break;
      case fioErrCode.NO_FACES_DETECTED:
        console.log('No faces were detected during the enroll or authentication process');
        break;
      case fioErrCode.UNRECOGNIZED_FACE:
        console.log("Unrecognized face on this application's Facial Index");
        break;
      case fioErrCode.MANY_FACES:
        console.log('Two or more faces were detected during the scan process');
        break;
      case fioErrCode.PAD_ATTACK:
        console.log('Presentation (Spoof) Attack (PAD) detected during the scan process');
        break;
      case fioErrCode.FACE_MISMATCH:
        console.log('Calculated Facial Vectors of the user being enrolled do not matches');
        break;
      case fioErrCode.WRONG_PIN_CODE:
        console.log('Wrong PIN code supplied by the user being authenticated');
        break;
      case fioErrCode.PROCESSING_ERR:
        console.log('Server side error');
        break;
      case fioErrCode.UNAUTHORIZED:
        console.log(
          'Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information'
        );
        break;
      case fioErrCode.TERMS_NOT_ACCEPTED:
        console.log('Terms & Conditions set out by FACEIO/host application rejected by the end user');
        break;
      case fioErrCode.UI_NOT_READY:
        console.log('The FACEIO Widget code could not be (or is being) injected onto the client DOM');
        break;
      case fioErrCode.SESSION_EXPIRED:
        console.log(
          'Client session expired. The first promise was already fulfilled but the host application failed to act accordingly'
        );
        break;
      case fioErrCode.TIMEOUT:
        console.log(
          'Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)'
        );
        break;
      case fioErrCode.TOO_MANY_REQUESTS:
        console.log(
          'Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications'
        );
        break;
      case fioErrCode.EMPTY_ORIGIN:
        console.log('Origin or Referer HTTP request header is empty or missing');
        break;
      case fioErrCode.FORBIDDDEN_ORIGIN:
        console.log('Domain origin is forbidden from instantiating fio.js');
        break;
      case fioErrCode.FORBIDDDEN_COUNTRY:
        console.log('Country ISO-3166-1 Code is forbidden from instantiating fio.js');
        break;
      case fioErrCode.SESSION_IN_PROGRESS:
        console.log('Another authentication or enrollment session is in progress');
        break;
      case fioErrCode.NETWORK_IO:
      default:
        console.log('Error while establishing network connection with the target FACEIO processing node');
        break;
    }
  }

  return (
    <div className="h-100 d-flex justify-content-center align-items-center flex-column">
      <h1>Face Authentication by FaceIO</h1>
      <div>
        <button type="button" className='btn btn-secondary m-1' onClick={enrollNewUser}>Sign-in</button>
        <button type="button" className='btn btn-secondary m-1' onClick={authenticateUser}>Log-in</button>
      </div>
    </div>
  );
}

export default App;
