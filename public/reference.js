// Global variables
let references = [];
let editingReferenceId = null;
let deleteReferenceId = null;

// DOM elements
const referencesTableBody = document.getElementById('referencesTableBody');
const addReferenceBtn = document.getElementById('addReferenceBtn');
const searchInput = document.getElementById('searchInput');
const referenceModal = document.getElementById('referenceModal');
const deleteModal = document.getElementById('deleteModal');
const referenceForm = document.getElementById('referenceForm');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const noReferences = document.getElementById('noReferences');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadReferences();
    
    addReferenceBtn.addEventListener('click', openAddModal);
    closeBtn.addEventListener('click', closeModal);
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    
    // Search functionality
    searchInput.addEventListener('input', filterReferences);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === referenceModal) {
            closeModal();
        }
        if (event.target === deleteModal) {
            closeDeleteModal();
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
            displayReferencesTable();
        } else {
            console.error('Failed to load references');
        }
    } catch (error) {
        console.error('Error loading references:', error);
    }
}

// Display references in table format
function displayReferencesTable() {
    if (references.length === 0) {
        referencesTableBody.innerHTML = '';
        document.querySelector('.references-table-container').style.display = 'none';
        noReferences.style.display = 'block';
        return;
    }
    
    document.querySelector('.references-table-container').style.display = 'block';
    noReferences.style.display = 'none';
    
    referencesTableBody.innerHTML = references.map((reference, index) => {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <div class="reference-title-cell">
                        <strong>${reference.title}</strong>
                        <div class="reference-authors-cell">${reference.authors}</div>
                    </div>
                </td>
                <td>${reference.authors}</td>
                <td>${reference.journal}</td>
                <td>${reference.year}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-primary btn-small" onclick="openPdf('${reference.pdfUrl}')" title="เปิด PDF">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                            </svg>
                        </button>
                        <button class="btn btn-secondary btn-small" onclick="editReference('${reference._id}')" title="แก้ไข">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                            </svg>
                        </button>
                        <button class="btn btn-danger btn-small" onclick="deleteReference('${reference._id}')" title="ลบ">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Filter references based on search input
function filterReferences() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredReferences = references.filter(reference => 
        reference.title.toLowerCase().includes(searchTerm) ||
        reference.authors.toLowerCase().includes(searchTerm) ||
        reference.journal.toLowerCase().includes(searchTerm)
    );
    
    displayFilteredReferences(filteredReferences);
}

// Display filtered references
function displayFilteredReferences(filteredReferences) {
    if (filteredReferences.length === 0) {
        referencesTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem;">
                    ไม่พบรายการอ้างอิงที่ตรงกับคำค้นหา
                </td>
            </tr>
        `;
        return;
    }
    
    referencesTableBody.innerHTML = filteredReferences.map((reference, index) => {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <div class="reference-title-cell">
                        <strong>${reference.title}</strong>
                        <div class="reference-authors-cell">${reference.authors}</div>
                    </div>
                </td>
                <td>${reference.authors}</td>
                <td>${reference.journal}</td>
                <td>${reference.year}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-primary btn-small" onclick="openPdf('${reference.pdfUrl}')" title="เปิด PDF">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                            </svg>
                        </button>
                        <button class="btn btn-secondary btn-small" onclick="editReference('${reference._id}')" title="แก้ไข">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                            </svg>
                        </button>
                        <button class="btn btn-danger btn-small" onclick="deleteReference('${reference._id}')" title="ลบ">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
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

// Close delete modal
function closeDeleteModal() {
    deleteModal.style.display = 'none';
    deleteReferenceId = null;
}

// Delete reference
function deleteReference(id) {
    deleteReferenceId = id;
    deleteModal.style.display = 'block';
}

// Confirm delete
async function confirmDelete() {
    if (!deleteReferenceId) return;
    
    try {
        const response = await fetch(`/api/references/${deleteReferenceId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            closeDeleteModal();
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
    
    .reference-title-cell {
        max-width: 300px;
    }
    
    .reference-authors-cell {
        font-size: 0.875rem;
        color: #666;
        margin-top: 0.25rem;
    }
    
    .table-actions {
        display: flex;
        gap: 0.25rem;
    }
    
    .table-actions .btn-small {
        padding: 0.25rem;
        min-width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style); 