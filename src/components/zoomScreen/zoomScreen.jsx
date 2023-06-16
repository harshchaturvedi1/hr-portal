import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./zoomScreen.module.css";
import { ZoomMtg } from "@zoomus/websdk";

// function ZoomMetting() {
// const ZoomMetting = () => {
//   var authEndpoint = "http://localhost:4000";
//   var sdkKey = "wwm9ht91QZuo5_cw9qGz4w";
//   var meetingNumber = "84048455424";
//   var passWord = "";
//   var role = 0;
//   var userName = "React";
//   var userEmail = "";
//   var registrantToken = "";
//   var zakToken = "";
//   var leaveUrl = "http://localhost:3000";

//   function getSignature(e) {
//     e.preventDefault();

//     try {
//       fetch(authEndpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           meetingNumber: meetingNumber,
//           role: role,
//         }),
//       })
//         .then((res) => res.json())
//         .then((response) => {
//           startMeeting(response.signature);
//         })
//         .catch((error) => {
//           console.error("error in connecting mwtting ===>", error);
//         });
//     } catch (err) {
//       console.log("error in catch", err);
//     }
//   }

//   function startMeeting(signature) {
//     document.getElementById("zmmtg-root").style.display = "block";

//     ZoomMtg.init({
//       leaveUrl: leaveUrl,
//       success: (success) => {
//         console.log("metting success ===>", success);

//         ZoomMtg.join({
//           signature: signature,
//           sdkKey: sdkKey,
//           meetingNumber: meetingNumber,
//           passWord: passWord,
//           userName: userName,
//           userEmail: userEmail,
//           tk: registrantToken,
//           zak: zakToken,
//           success: (success) => {
//             console.log("metting success 2 ===>", success);
//           },
//           error: (error) => {
//             console.log(error);
//           },
//         });
//       },
//       error: (error) => {
//         console.log(error);
//       },
//     });
//   }

//   useEffect(() => {
//     ZoomMtg.setZoomJSLib("https://source.zoom.us/2.12.2/lib", "/av");
//     ZoomMtg.preLoadWasm();
//     ZoomMtg.prepareWebSDK();
//     // loads language files, also passes any error messages to the ui
//     ZoomMtg.i18n.load("en-US");
//     ZoomMtg.i18n.reload("en-US");

//     return () => {
//       document.getElementById("zmmtg-root").style.display = "none";
//     };
//   }, []);

//   const navigate = useNavigate();
//   const handleMEting = () => {
//     console.log("clicked");
//     // navigate(
//     //   "/https://us05web.zoom.us/j/89732981676?pwd=OWRaNWp3aWxlKzZ5VW53c1d4TG9LZz09"
//     // );
//     const fileUrl =
//       "https://us05web.zoom.us/j/89732981676?pwd=OWRaNWp3aWxlKzZ5VW53c1d4TG9LZz09";
//     window.open(fileUrl, "_blank");
//   };

//   return (
//     <div className={styles.zoomFirst}>
//       {/* <h1>Zoom Meeting SDK Sample React</h1>
//       <button onClick={(e) => handleMEting(e)} className={styles.joinButton}>
//         Join Meeting
//       </button> */}
//       {/* <button onClick={(e) => getSignature(e)} className={styles.joinButton}>
//         Join Meeting
//       </button> */}

//       <iframe
//         style={{ width: "100%", height: "100%" }}
//         src="https://us05web.zoom.us/j/82603080605?pwd=eXZXclhLblR2NUx1NUMrSCs3Y0NCZz09"
//         allow="camera; microphone"
//       ></iframe>
//     </div>
//   );
// };

const ZoomMetting = ({ zoomUrl }) => {
  const [viewMetting, setViewMetting] = useState(false);

  useEffect(() => {
    const downloadLink = document.createElement("a");
    downloadLink.href = zoomUrl;
    downloadLink.setAttribute("target", "_blank");
    console.log("downloadLink", downloadLink);
    downloadLink.click();
  }, []);

  return (
    <div className={styles.zoomFirst}>
      {!viewMetting && (
        <div>
          <h1>Zoom Meeting SDK Sample React</h1>
          <button
            onClick={() => setViewMetting(true)}
            className={styles.joinButton}
          >
            Join Meeting
          </button>
        </div>
      )}
      {viewMetting && (
        <iframe
          style={{ width: "100%", height: "100%" }}
          src={zoomUrl}
          allow="camera; microphone; fullscreen"
          sandbox="allow-same-origin allow-scripts"
        ></iframe>
      )}
    </div>
  );
};

export default ZoomMetting;
