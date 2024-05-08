var firebaseConfig = {
    apiKey: "AIzaSyCSyzT8cx_aKJ6OP_hb2tlVnkCOD2YTIIU",
    authDomain: "ckd12345-e67d3.firebaseapp.com",
    projectId: "ckd12345-e67d3",
    storageBucket: "ckd12345-e67d3.appspot.com",
    messagingSenderId: "85275653391",
    appId: "1:85275653391:web:e8ef369b2585abb06aba7a",
    measurementId: "G-57D04XBDM5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database()

function save() {
    var patientName = document.getElementById('patientName').value;
    var patientAge = document.getElementById('patientAge').value;
    var prescriptionDay = document.getElementById('prescriptionDay').value;
    var prescriptionMedicine = document.getElementById('prescriptionMedicine').value;
    var prescriptionDosage = document.getElementById('prescriptionDosage').value;
    var prescriptionInstructions = document.getElementById('prescriptionInstructions').value;

    database.ref('prescriptions/' + patientName).set({
        patientName: patientName,
        patientAge: patientAge,
        prescriptionDay: prescriptionDay,
        prescriptionMedicine: prescriptionMedicine,
        prescriptionDosage: prescriptionDosage,
        prescriptionInstructions: prescriptionInstructions
    }).then(function () {
        displayMessage('Prescription saved successfully.');
    }).catch(function (error) {
        console.error('Error saving prescription: ', error);
    });
}

function get() {
    var patientName = document.getElementById('patientName').value;

    database.ref('prescriptions/' + patientName).once('value').then(function (snapshot) {
        var prescription = snapshot.val();
        if (prescription) {
            displayMessage('Prescription found: ' + JSON.stringify(prescription));
        } else {
            displayMessage('Prescription not found for the provided patient name.');
        }
    }).catch(function (error) {
        console.error('Error getting prescription: ', error);
    });
}

function update() {
    var patientName = document.getElementById('patientName').value;
    var patientAge = document.getElementById('patientAge').value;
    var prescriptionDay = document.getElementById('prescriptionDay').value;
    var prescriptionMedicine = document.getElementById('prescriptionMedicine').value;
    var prescriptionDosage = document.getElementById('prescriptionDosage').value;
    var prescriptionInstructions = document.getElementById('prescriptionInstructions').value;

    var updates = {
        patientName: patientName,
        patientAge: patientAge,
        prescriptionDay: prescriptionDay,
        prescriptionMedicine: prescriptionMedicine,
        prescriptionDosage: prescriptionDosage,
        prescriptionInstructions: prescriptionInstructions
    };

    database.ref('prescriptions/' + patientName).update(updates).then(function () {
        displayMessage('Prescription updated successfully.');
    }).catch(function (error) {
        console.error('Error updating prescription: ', error);
    });
}

function remove() {
    var patientName = document.getElementById('patientName').value;

    database.ref('prescriptions/' + patientName).remove().then(function () {
        displayMessage('Prescription deleted successfully.');
    }).catch(function (error) {
        console.error('Error deleting prescription: ', error);
    });
}

     // Function to display messages
     function displayMessage(message) {
        const messageContainer = document.getElementById('messageContainer');
        messageContainer.textContent = message;
    }