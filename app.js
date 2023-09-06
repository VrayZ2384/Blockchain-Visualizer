
function mineBlock() {
    {
        // If no transaction is inputted, mine a block without a transaction
        fetch('http://localhost:5000/mine_block')
            .then(response => response.json())
            .then(data => {
                displayMinedBlock(data); // Call the displayMinedBlock function
            });
    }
}

// Function to check the validity of the blockchain
function checkValidityChain() {
    console.log('Checking Validity...'); // Add this line for debugging
    fetch('http://localhost:5000/is_valid')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayValidity(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to get the blockchain data
function getChain() {
    fetch('http://localhost:5000/get_chain')
        .then(response => response.json())
        .then(data => {
            displayChain(data.chain); // Call the displayChain function
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


// Function to reset the blockchain
function resetChain() {
    fetch('http://localhost:5000/reset_chain', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayMinedBlock(data) {
    const blockchainDiv = document.getElementById('blockchain');
    blockchainDiv.innerHTML = ''; // Clear the blockchain container

    const blockDiv = document.createElement('div');
    blockDiv.classList.add('block');

    const blockTitle = document.createElement('p');
    blockTitle.classList.add('block-title');
    blockTitle.textContent = `Block #${data.index}`;
    blockDiv.appendChild(blockTitle);

    const blockContent = document.createElement('div');
    blockContent.classList.add('block-content');
    blockContent.innerHTML = `
        <p><strong>Timestamp:</strong> ${data.timestamp}</p>
        <p><strong>Proof:</strong> ${data.proof}</p>
        <p><strong>Previous Hash:</strong> ${data.previous_hash}</p>
    `;
    blockDiv.appendChild(blockContent);

    blockchainDiv.appendChild(blockDiv);
}


function displayValidity(data) {
    console.log('Displaying Validity:', data.message); // Log the message to the console
    const responseSpan = document.getElementById('response');
    responseSpan.textContent = '';

    const blockchainDiv = document.getElementById('blockchain');
    blockchainDiv.innerHTML = ''; // Clear the blockchain container

    const validityDiv = document.createElement('div');
    validityDiv.classList.add('block');

    const validityTitle = document.createElement('p');
    validityTitle.classList.add('block-title');
    validityTitle.textContent = 'Blockchain Validity';
    validityDiv.appendChild(validityTitle);

    const validityContent = document.createElement('div');
    validityContent.classList.add('block-content');
    validityContent.innerHTML = `
        <p>${data.message}</p>
    `;
    validityDiv.appendChild(validityContent);

    blockchainDiv.appendChild(validityDiv);
}


// Function to display the blockchain in card format
function displayChain(chain) {
    const blockchainDiv = document.getElementById('blockchain');
    blockchainDiv.innerHTML = '<h2>Blockchain :</h2><br>';

    // Iterate through the chain and display each block
    chain.forEach(block => {
        const blockDiv = document.createElement('div');
        blockDiv.classList.add('block');

        const blockTitle = document.createElement('p');
        blockTitle.classList.add('block-title');
        blockTitle.textContent = `Block #${block.index}`;
        blockDiv.appendChild(blockTitle);

        const blockContent = document.createElement('div');
        blockContent.classList.add('block-content');
        blockContent.innerHTML = `
            <p><strong>Timestamp:</strong> ${block.timestamp}</p>
            <p><strong>Proof:</strong> ${block.proof}</p>
            <p><strong>Previous Hash:</strong> ${block.previous_hash}</p>
        `;
        blockDiv.appendChild(blockContent);

        blockchainDiv.appendChild(blockDiv);
    });
}

// Function to reset the blockchain and display a message
function resetBlockchain() {
    fetch('http://localhost:5000/reset_chain', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // After resetting, clear the blockchain container and fetch the updated blockchain
        const blockchainDiv = document.getElementById('blockchain');
        blockchainDiv.innerHTML = ''; // Clear the blockchain container
        getChain();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
