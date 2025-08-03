// Global variables
let references = [];
let editingReferenceId = null;

// DOM elements
const referencesList = document.getElementById('referencesList');
const addReferenceBtn = document.getElementById('addReferenceBtn');
const referenceModal = document.getElementById('referenceModal');
const referenceForm = document.getElementById('referenceForm');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadReferences();
    
    addReferenceBtn.addEventListener('click', openAddModal);
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === referenceModal) {
            closeModal();
        }
    });
    
    // Form submission
    referenceForm.addEventListener('submit', handleFormSubmit);
});

// Load references from API
async function loadReferences() {
    try {
        const response = await fetch('/api/references');
        if (response.ok) {
            references = await response.json();
            displayReferences();
        } else {
            console.error('Failed to load references');
        }
    } catch (error) {
        console.error('Error loading references:', error);
    }
}

// Display references in IEEE format
function displayReferences() {
    if (references.length === 0) {
        referencesList.innerHTML = '<p class="no-data">ยังไม่มีรายการอ้างอิง</p>';
        return;
    }
    
    referencesList.innerHTML = references.map((reference, index) => {
        const ieeeFormat = formatIEEE(reference);
        return `
            <div class="reference-item">
                <div class="reference-header">
                    <div>
                        <div class="reference-title">[${index + 1}] ${reference.title}</div>
                        <div class="reference-authors">${reference.authors}</div>
                        <div class="reference-details">${ieeeFormat}</div>
                    </div>
                    <div class="reference-actions">
                        <button class="btn btn-primary btn-small" onclick="openPdf('${reference.pdfUrl}')">
                            เปิด PDF
                        </button>
                        <button class="btn btn-secondary btn-small" onclick="editReference('${reference._id}')">
                            แก้ไข
                        </button>
                        <button class="btn btn-danger btn-small" onclick="deleteReference('${reference._id}')">
                            ลบ
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Format reference in IEEE style
function formatIEEE(reference) {
    let format = `${reference.authors}, "${reference.title}," `;
    
    if (reference.journal) {
        format += `<em>${reference.journal}</em>`;
    }
    
    if (reference.volume) {
        format += `, vol. ${reference.volume}`;
    }
    
    if (reference.issue) {
        format += `, no. ${reference.issue}`;
    }
    
    if (reference.pages) {
        format += `, pp. ${reference.pages}`;
    }
    
    format += `, ${reference.year}`;
    
    if (reference.doi) {
        format += `, doi: ${reference.doi}`;
    }
    
    return format;
}

// Open PDF in new tab
function openPdf(url) {
    window.open(url, '_blank');
}

// Open add reference modal
function openAddModal() {
    editingReferenceId = null;
    modalTitle.textContent = 'เพิ่มอ้างอิงใหม่';
    referenceForm.reset();
    referenceModal.style.display = 'block';
}

// Open edit reference modal
function editReference(id) {
    editingReferenceId = id;
    const reference = references.find(ref => ref._id === id);
    if (reference) {
        modalTitle.textContent = 'แก้ไขอ้างอิง';
        fillFormWithReference(reference);
        referenceModal.style.display = 'block';
    }
}

// Fill form with reference data
function fillFormWithReference(reference) {
    document.getElementById('referenceId').value = reference._id;
    document.getElementById('title').value = reference.title;
    document.getElementById('authors').value = reference.authors;
    document.getElementById('journal').value = reference.journal;
    document.getElementById('year').value = reference.year;
    document.getElementById('volume').value = reference.volume || '';
    document.getElementById('issue').value = reference.issue || '';
    document.getElementById('pages').value = reference.pages || '';
    document.getElementById('doi').value = reference.doi || '';
    document.getElementById('pdfUrl').value = reference.pdfUrl;
}

// Close modal
function closeModal() {
    referenceModal.style.display = 'none';
    editingReferenceId = null;
    referenceForm.reset();
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(referenceForm);
    const referenceData = {
        title: formData.get('title'),
        authors: formData.get('authors'),
        journal: formData.get('journal'),
        year: parseInt(formData.get('year')),
        volume: formData.get('volume'),
        issue: formData.get('issue'),
        pages: formData.get('pages'),
        doi: formData.get('doi'),
        pdfUrl: formData.get('pdfUrl')
    };
    
    try {
        let response;
        if (editingReferenceId) {
            // Update existing reference
            response = await fetch(`/api/references/${editingReferenceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(referenceData)
            });
        } else {
            // Create new reference
            response = await fetch('/api/references', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(referenceData)
            });
        }
        
        if (response.ok) {
            closeModal();
            loadReferences();
            showNotification('บันทึกข้อมูลสำเร็จ', 'success');
        } else {
            const error = await response.json();
            showNotification('เกิดข้อผิดพลาด: ' + error.error, 'error');
        }
    } catch (error) {
        console.error('Error saving reference:', error);
        showNotification('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'error');
    }
}

// Delete reference
async function deleteReference(id) {
    if (confirm('คุณต้องการลบรายการอ้างอิงนี้หรือไม่?')) {
        try {
            const response = await fetch(`/api/references/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadReferences();
                showNotification('ลบข้อมูลสำเร็จ', 'success');
            } else {
                showNotification('เกิดข้อผิดพลาดในการลบข้อมูล', 'error');
            }
        } catch (error) {
            console.error('Error deleting reference:', error);
            showNotification('เกิดข้อผิดพลาดในการลบข้อมูล', 'error');
        }
    }
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#28a745';
    } else {
        notification.style.backgroundColor = '#dc3545';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 