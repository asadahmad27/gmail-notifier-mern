import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { realtimeDb } from "../firebaseConfig";

const EmailsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMail, setSelectedMail] = useState(null);

  useEffect(() => {
    const dataRef = ref(realtimeDb, "users"); // Reference to the 'emails' path or any other path

    const unsubscribe = onValue(
      dataRef,
      (snapshot) => {
        const fetchedData = snapshot.val();
        console.log("heteee", fetchedData);
        if (fetchedData) {
          const dataArray = Object.entries(fetchedData).map(
            ([id, details]) => ({
              id,
              ...details,
            })
          );
          setData(dataArray);
          onSelectMail(selectedMail?.email);
        } else {
          setData([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching emails:", error);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  console.log(data, "Dataaa");

  const onSelectMail = (mail) => {
    const mailData = data?.filter((item) => item.id === mail.id);
    console.log(mailData);
    setSelectedMail(mailData[0]);
  };
  return (
    <div>
      <h1>Firebase Realtime Database Data</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : data.length > 0 ? (
        <table border="2">
          <thead>
            <tr>
              <th>Email ID</th>
              <th>Email</th>

              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.email}</td>

                <td>
                  <button onClick={() => onSelectMail(item)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}

      {selectedMail && (
        <table border="2" style={{ maxWidth: "100%", overflow: "scroll" }}>
          <thead>
            <tr>
              <th>From</th>
              <th>Subject</th>

              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {selectedMail?.mails?.map((item, index) => (
              <tr key={index}>
                <td>{item?.From}</td>
                <td>{item?.Subject}</td>
                <td style={{ maxWidth: "900px" }}>{item?.text_plain}</td>

                {/* <td style={{ maxWidth: "100px" }}>
                <button onClick={() => onSelectMail(item)}>View</button>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmailsData;
