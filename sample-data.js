// Sample data for testing the application
// This file can be used to populate the database with initial data

const sampleReferences = [
    {
        title: "Machine Learning Applications in Healthcare: A Comprehensive Review",
        authors: "J. Smith, A. Johnson, and M. Williams",
        journal: "IEEE Journal of Biomedical and Health Informatics",
        year: 2023,
        volume: "27",
        issue: "3",
        pages: "1234-1250",
        doi: "10.1109/JBHI.2023.1234567",
        pdfUrl: "https://ieeexplore.ieee.org/document/1234567"
    },
    {
        title: "Deep Learning for Natural Language Processing: Recent Advances",
        authors: "R. Brown, S. Davis, and L. Wilson",
        journal: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
        year: 2023,
        volume: "45",
        issue: "2",
        pages: "567-589",
        doi: "10.1109/TPAMI.2023.7654321",
        pdfUrl: "https://ieeexplore.ieee.org/document/7654321"
    },
    {
        title: "Blockchain Technology in Supply Chain Management",
        authors: "T. Anderson, K. Martinez, and P. Rodriguez",
        journal: "IEEE Transactions on Engineering Management",
        year: 2022,
        volume: "69",
        issue: "4",
        pages: "890-912",
        doi: "10.1109/TEM.2022.9876543",
        pdfUrl: "https://ieeexplore.ieee.org/document/9876543"
    },
    {
        title: "Internet of Things Security: Challenges and Solutions",
        authors: "M. Garcia, N. Thompson, and O. Lee",
        journal: "IEEE Communications Surveys & Tutorials",
        year: 2022,
        volume: "24",
        issue: "1",
        pages: "234-256",
        doi: "10.1109/COMST.2022.1111111",
        pdfUrl: "https://ieeexplore.ieee.org/document/1111111"
    },
    {
        title: "Artificial Intelligence in Education: Opportunities and Challenges",
        authors: "C. White, D. Black, and E. Green",
        journal: "IEEE Transactions on Learning Technologies",
        year: 2023,
        volume: "16",
        issue: "2",
        pages: "345-367",
        doi: "10.1109/TLT.2023.2222222",
        pdfUrl: "https://ieeexplore.ieee.org/document/2222222"
    }
];

// Function to add sample data to database
async function addSampleData() {
    try {
        const response = await fetch('/api/references', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sampleReferences[0])
        });
        
        if (response.ok) {
            console.log('Sample data added successfully');
        } else {
            console.error('Failed to add sample data');
        }
    } catch (error) {
        console.error('Error adding sample data:', error);
    }
}

// Export for use in browser console
if (typeof window !== 'undefined') {
    window.sampleReferences = sampleReferences;
    window.addSampleData = addSampleData;
}

module.exports = { sampleReferences, addSampleData }; 