document.addEventListener("DOMContentLoaded", () => {
    const userEmail = localStorage.getItem("userEmail");
    const apiUrl = `http://localhost:8080/api/incidents/user`;
    const apiUrl2 = `http://localhost:8080/api/incidents`;
    const incidentTableBody = document.querySelector("#incidentTable tbody");
    if (!userEmail) {
        window.location.href = '/login.html';
    }

    const fetchIncidents = async (email) => {
        try {
            const response = await fetch(`${apiUrl}/${email}`);
            const incidents = await response.json();
            //console.log(incidents)

            incidentTableBody.innerHTML = "";
            incidents.forEach((incident) => {
                const row = document.createElement("tr");

                const incidentIdCell = document.createElement("td");
                incidentIdCell.textContent = incident.incidentId;
                incidentIdCell.addEventListener("click", () => showDetailsPopup(incident));
                row.appendChild(incidentIdCell);

                const detailsCell = document.createElement("td");
                detailsCell.textContent = incident.incidentDetails;
                row.appendChild(detailsCell);

                const reportedDateCell = document.createElement("td");
                reportedDateCell.textContent = new Date(incident.reportedDateTime).toLocaleDateString();
                row.appendChild(reportedDateCell);

                const statusCell = document.createElement("td");
                statusCell.textContent = incident.status;
                row.appendChild(statusCell);

                const editButtonCell = document.createElement("td");
                if (incident.status !== 'CLOSED') {
                    const editButton = document.createElement("button");
                    editButton.className = "edit-icon";
                    editButton.onclick = () => editIncident(incident);
                    editButton.textContent = "Edit";
                    editButtonCell.appendChild(editButton);
                }
                row.appendChild(editButtonCell);

                incidentTableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching incidents:", error);
        }
    };

    const searchIncidents = async () => {
        const searchInput = document.querySelector("#searchInput").value.trim();
        if (!searchInput) return;

        try {
            const response = await fetch(`${apiUrl2}/${searchInput}`);
            if (!response.ok) throw new Error("Failed to fetch incident by ID");
            const incident = await response.json();
            //console.log(incident)

            incidentTableBody.innerHTML = "";
            if (incident != []) {
                const row = document.createElement("tr");

                const incidentIdCell = document.createElement("td");
                incidentIdCell.textContent = incident.incidentId;
                incidentIdCell.addEventListener("click", () => showDetailsPopup(incident));
                row.appendChild(incidentIdCell);

                const detailsCell = document.createElement("td");
                detailsCell.textContent = incident.incidentDetails;
                row.appendChild(detailsCell);

                const reportedDateCell = document.createElement("td");
                reportedDateCell.textContent = new Date(incident.reportedDateTime).toLocaleDateString();
                row.appendChild(reportedDateCell);

                const statusCell = document.createElement("td");
                statusCell.textContent = incident.status;
                row.appendChild(statusCell);

                const editButtonCell = document.createElement("td");
                if (incident.status !== 'CLOSED') {
                    const editButton = document.createElement("button");
                    editButton.className = "edit-icon";
                    editButton.onclick = () => editIncident(incident);
                    editButton.textContent = "Edit";
                    editButtonCell.appendChild(editButton);
                }
                row.appendChild(editButtonCell);

                incidentTableBody.appendChild(row);
            } else {
                incidentTableBody.innerHTML = `<tr><td colspan="4">No results found</td></tr>`;
            }
        } catch (error) {
            console.error("Error searching incident:", error);
        }
    };

    const showDetailsPopup = (incident) => {
        const detailsPopup = document.querySelector("#detailsPopup");
        document.querySelector("#incidentIdDetail").textContent = `Incident ID: ${incident.incidentId}`;
        document.querySelector("#subjectDetail").textContent = `Description: ${incident.incidentDetails}`;
        document.querySelector("#descriptionDetail").textContent = `Priority: ${incident.priority}`;
        document.querySelector("#dateDetail").textContent = `Date: ${new Date(incident.reportedDateTime).toLocaleDateString()}`;
        document.querySelector("#statusDetail").textContent = `Status: ${incident.status}`;
        detailsPopup.style.display = "block";
    };

    const closePopup = () => {
        document.querySelector("#detailsPopup").style.display = "none";
    };

    document.querySelector("#detailsPopup button").addEventListener("click", closePopup);

    document.querySelector(".search-container button").addEventListener("click", searchIncidents);

    fetchIncidents(userEmail);
});

document.querySelector('.add-button').addEventListener('click', async function () {
    const addButton = document.querySelector('.add-button');
    const popup = document.getElementById('popup');
    //console.log(popup.style.display)
    // const popup = document.getElementById('popup');
    popup.classList.toggle('visible');
    // const popupOverlay = document.querySelector('.popup-overlay');
    const closePopup = document.getElementById('closePopup');
    const addIncidentButton = document.getElementById('addIncident');
    const email = window.localStorage.getItem('userEmail');


    // const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const response = await fetch(`http://localhost:8080/api/users/${email}`)
    const userDetails = await response.json();
    // //console.log(userDetails)
    if (userDetails) {
        document.getElementById('firstName').value = userDetails.firstName;
        document.getElementById('lastName').value = userDetails.lastName;
        document.getElementById('email').value = userDetails.email;
        document.getElementById('address').value = userDetails.address;
        document.getElementById('country').value = userDetails.country;
        document.getElementById('state').value = userDetails.state;
        document.getElementById('city').value = userDetails.city;
        document.getElementById('pincode').value = userDetails.pincode;
        document.getElementById('mobileNumber').value = userDetails.mobileNumber;
    }

    popup.style.display = 'block';
    // popupOverlay.style.display = 'block';


    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
        // popupOverlay.style.display = 'none';
    });

    // popupOverlay.addEventListener('click', () => {
    //     popup.style.display = 'none';
    //     popupOverlay.style.display = 'none';
    // });

    addIncidentButton.addEventListener('click', () => {
        console.log(document.getElementById('reporterName').value, document.getElementById('incidentDetails').value, document.getElementById('priority').value, document.getElementById('status').value)
        const incidentPayload = {
            "reporterName": document.getElementById('reporterName').value,
            "incidentDetails": document.getElementById('incidentDetails').value,
            "priority": document.getElementById('priority').value,
            "status": document.getElementById('status').value,
        };
        const email = localStorage.getItem("userEmail");

        fetch(`http://localhost:8080/api/incidents/create?userEmail=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(incidentPayload),
        })
            .then(response => response.json())
            .then(data => {
                //console.log('Incident added:', data);
                alert('Incident successfully added!');
                popup.style.display = 'none';
            })
            .catch(error => {
                console.error('Error adding incident:', error);
            });
    });
});
let currentIncidentId = null;
function editIncident(incident) {
    //console.log(incident)
    if (incident) {
        document.getElementById("incidentIdEdit").value = incident.incidentId;
        document.getElementById("reportedDateTimeEdit").value = new Date(incident.reportedDateTime).toLocaleDateString();
        document.getElementById("incidentDetailsEdit").value = incident.incidentDetails;
        document.getElementById("reporterNameEdit").value = incident.reporterName;
        document.getElementById("statusEdit").value = incident.status;
        document.getElementById("priorityEdit").value = incident.priority;

        document.getElementById("editIncidentModal").style.display = "block";

        currentIncidentId = incident.incidentId;
    }
}

document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("editIncidentModal").style.display = "none";
    currentIncidentId = null;  
});

document.getElementById("editIncidentForm").addEventListener("submit", async function (event) {
    event.preventDefault();  

    const updatedIncidentDetails = document.getElementById("incidentDetailsEdit").value;
    const updatedReportername = document.getElementById("reporterNameEdit").value;
    const updatedStatus = document.getElementById("statusEdit").value;
    const updatedPriority = document.getElementById("priorityEdit").value;

    const updatedIncident = {
        "reporterName": updatedReportername,
        "incidentDetails": updatedIncidentDetails,
        "priority": updatedPriority,
        "status": updatedStatus
    };

    const incidentId = document.getElementById("incidentIdEdit").value
    const response = await fetch(`http://localhost:8080/api/incidents/${incidentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedIncident),
    }
    )
    const ok = await response.json();
    //console.log(ok)

    document.getElementById("editIncidentModal").style.display = "none";
    currentIncidentId = null;
});

function closePopup() {
    document.getElementById("detailsPopup").style.display = "none";
}