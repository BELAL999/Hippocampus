/**
 * Hippocampus Academy - Enrollment Page JavaScript
 * Handles dynamic content loading based on course selection
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course');
    const typeParam = urlParams.get('type');
    
    // If no course specified, show default message
    if (!courseParam || !typeParam) {
        showErrorMessage();
        return;
    }
    
    // Load course details
    loadCourseDetails(courseParam, typeParam);
    
    // Initialize form submission handler
    initEnrollmentForm();
    
    // Initialize FAQ accordions
    initFaqAccordion();
});

/**
 * Show error message if no course is specified
 */
function showErrorMessage() {
    document.getElementById('course-title').textContent = 'Course Not Found';
    document.getElementById('course-subtitle').textContent = 'The requested course could not be found';
    document.getElementById('dynamic-content').innerHTML = `
        <section class="error-message">
            <div class="container">
                <div class="error-content">
                    <h2>Course Not Found</h2>
                    <p>We couldn't find the course you're looking for. Please return to our courses page and try again.</p>
                    <div class="error-actions">
                        <a href="medicine.html" class="btn btn-primary">Medicine Courses</a>
                        <a href="dental.html" class="btn btn-secondary">Dental Courses</a>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Hide enrollment form
    document.getElementById('enrollment-form').style.display = 'none';
}

/**
 * Load course details based on the selected course and type
 */
function loadCourseDetails(courseSlug, courseType) {
    // Get course data from our course database
    const courseData = getCourseData(courseSlug, courseType);
    
    if (!courseData) {
        showErrorMessage();
        return;
    }
    
    // Update page title and metadata
    document.title = `${courseData.name} Enrollment - Hippocampus Academy`;
    document.getElementById('course-title').textContent = courseData.name;
    document.getElementById('course-subtitle').textContent = `${courseType === 'medicine' ? 'Medicine' : 'Dental'} Course`;
    
    // Update course overview section
    document.getElementById('course-name').textContent = courseData.name;
    document.getElementById('course-duration').innerHTML = `<i class="far fa-clock"></i> ${courseData.duration}`;
    document.getElementById('course-students').innerHTML = `<i class="fas fa-users"></i> Limited to ${courseData.studentLimit} Students`;
    document.getElementById('course-price').innerHTML = `<i class="fas fa-tag"></i> ${courseData.price} SAR`;
    
    // Set course image class
    document.getElementById('course-image').className = `course-detail-image ${courseSlug}`;
    
    // Load dynamic content
    document.getElementById('dynamic-content').innerHTML = `
        <!-- Instructor Profile -->
        <section class="instructor-profile">
            <div class="container">
                <h2 class="section-title">Meet Your Instructor</h2>
                <div class="instructor-profile-content">
                    <div class="instructor-profile-image">
                        <div class="instructor-img-large ${courseData.instructor.imageClass}"></div>
                    </div>
                    <div class="instructor-profile-details">
                        <h3>${courseData.instructor.name}</h3>
                        <p class="instructor-title">${courseData.instructor.title}</p>
                        <div class="instructor-bio">
                            ${courseData.instructor.bio}
                        </div>
                        <div class="instructor-expertise">
                            <h4>Areas of Expertise</h4>
                            <ul>
                                ${courseData.instructor.expertise.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="instructor-publications">
                            <h4>Selected Publications</h4>
                            <ul>
                                ${courseData.instructor.publications.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Curriculum -->
        <section class="curriculum" id="curriculum">
            <div class="container">
                <h2 class="section-title">Course Curriculum</h2>
                <div class="curriculum-overview">
                    <p>${courseData.curriculumOverview}</p>
                </div>
                <div class="curriculum-modules">
                    ${courseData.modules.map((module, index) => `
                        <div class="curriculum-module">
                            <div class="module-header">
                                <h3>Module ${index + 1}: ${module.title}</h3>
                                <span class="module-duration">${module.duration}</span>
                            </div>
                            <div class="module-content">
                                <p>${module.description}</p>
                                <h4>Topics Covered</h4>
                                <ul>
                                    ${module.topics.map(topic => `<li>${topic}</li>`).join('')}
                                </ul>
                                ${module.assessment ? `
                                <div class="module-assessment">
                                    <h4>Assessment</h4>
                                    <p>${module.assessment}</p>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="learning-outcomes">
                    <h3>Learning Outcomes</h3>
                    <p>Upon completing this course, you will be able to:</p>
                    <ul>
                        ${courseData.learningOutcomes.map(outcome => `<li>${outcome}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="course-materials">
                    <h3>Required Materials</h3>
                    <ul>
                        ${courseData.materials.map(material => `<li>${material}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </section>
    `;
}

/**
 * Initialize enrollment form submission
 */
function initEnrollmentForm() {
    const enrollForm = document.getElementById('enroll-form');
    
    if (enrollForm) {
        enrollForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const fullName = document.getElementById('full-name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const terms = document.getElementById('terms');
            
            let isValid = true;
            
            // Clear previous error states
            const formElements = enrollForm.querySelectorAll('input, textarea, select');
            formElements.forEach(element => {
                element.classList.remove('error');
            });
            
            // Validate required fields
            if (!fullName.value.trim()) {
                fullName.classList.add('error');
                isValid = false;
            }
            
            if (!email.value.trim()) {
                email.classList.add('error');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                email.classList.add('error');
                isValid = false;
            }
            
            if (!phone.value.trim()) {
                phone.classList.add('error');
                isValid = false;
            }
            
            if (!terms.checked) {
                terms.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                // In a real implementation, this would send the form data to a server
                // For demo purposes, show success message
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <h3>Application Submitted Successfully!</h3>
                    <p>Thank you for your interest in our course. We have received your application and will contact you within 2-3 business days to confirm your enrollment and provide payment details.</p>
                    <p>If you have any questions, please contact our admissions office at <strong>admissions@hippocampusacademy.sa</strong> or call <strong>+966 12 345 6700</strong>.</p>
                `;
                
                // Hide form and show success message
                enrollForm.style.display = 'none';
                enrollForm.parentNode.appendChild(successMessage);
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Reset form for possible future use
                enrollForm.reset();
            } else {
                // Scroll to the first error
                const firstError = enrollForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
}

/**
 * Email validation helper function
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * Get course data based on course slug and type
 */
function getCourseData(courseSlug, courseType) {
    // Course database
    const courseDatabase = {
        // Medicine Courses
        'clinical-diagnosis': {
            type: 'medicine',
            name: 'Clinical Diagnosis Fundamentals',
            duration: '12 Weeks',
            studentLimit: 25,
            price: '3,500',
            instructor: {
                name: 'Dr. Abdullah Al-Qahtani',
                title: 'MD, FRCPC, Professor of Internal Medicine',
                imageClass: 'dr-abdullah',
                bio: 'Dr. Abdullah Al-Qahtani is a distinguished Professor of Internal Medicine at King Saud University with over 15 years of clinical experience. He completed his medical degree at King Saud University, followed by residency training at McGill University in Canada. Dr. Al-Qahtani specializes in diagnostic medicine and has published numerous research papers on innovative diagnostic approaches. His teaching methodology combines theoretical frameworks with practical clinical scenarios, helping students develop strong diagnostic reasoning skills. Dr. Al-Qahtani has received multiple teaching excellence awards and continues to mentor medical students and residents in their clinical practice.',
                expertise: [
                    'Clinical Reasoning and Diagnostic Methods',
                    'Physical Examination Techniques',
                    'Evidence-based Diagnostic Approaches',
                    'Medical Education and Curriculum Development',
                    'Complex Case Management'
                ],
                publications: [
                    'Al-Qahtani A, et al. (2023). "Modern Approaches to Clinical Diagnosis in Internal Medicine." Saudi Medical Journal.',
                    'Al-Qahtani A, et al. (2021). "Teaching Diagnostic Reasoning: A Systematic Review of Methods." Medical Education Review.',
                    'Al-Qahtani A, et al. (2019). "Cognitive Biases in Clinical Decision Making: Recognition and Mitigation." Journal of Medical Education.'
                ]
            },
            curriculumOverview: 'This comprehensive course covers the essential skills and knowledge required for effective clinical diagnosis. Students will learn systematic approaches to patient assessment, diagnostic reasoning, and clinical decision-making. The course combines theoretical lectures with practical sessions, case studies, and clinical simulations to provide a well-rounded learning experience.',
            modules: [
                {
                    title: 'Foundations of Clinical Diagnosis',
                    duration: '2 Weeks',
                    description: 'Introduction to the principles and process of clinical diagnosis, including history-taking and the diagnostic reasoning process.',
                    topics: [
                        'The Diagnostic Process Framework',
                        'Clinical Reasoning Models',
                        'Patient-Centered History Taking',
                        'Documentation and Medical Records',
                        'Ethics in Clinical Diagnosis'
                    ]
                },
                {
                    title: 'Physical Examination Skills',
                    duration: '3 Weeks',
                    description: 'Comprehensive review of physical examination techniques with emphasis on proper technique and interpretation of findings.',
                    topics: [
                        'General Inspection and Vital Signs',
                        'Head-to-Toe Examination Techniques',
                        'System-Based Examination Approaches',
                        'Normal vs. Abnormal Findings',
                        'Cultural Considerations in Physical Examination'
                    ],
                    assessment: 'Practical examination requiring demonstration of physical examination techniques on standardized patients.'
                },
                {
                    title: 'Diagnostic Testing',
                    duration: '2 Weeks',
                    description: 'Overview of common diagnostic tests, their indications, limitations, and interpretation.',
                    topics: [
                        'Laboratory Test Selection and Interpretation',
                        'Imaging Studies: Indications and Limitations',
                        'Point-of-Care Testing',
                        'Cost-Effective Diagnostic Strategies',
                        'Sensitivity, Specificity, and Predictive Values'
                    ]
                },
                {
                    title: 'Clinical Decision Making',
                    duration: '2 Weeks',
                    description: 'Analysis of decision-making processes in clinical practice, including cognitive biases and evidence-based approaches.',
                    topics: [
                        'Diagnostic Reasoning Strategies',
                        'Cognitive Biases in Diagnosis',
                        'Evidence-based Clinical Decision Making',
                        'Managing Diagnostic Uncertainty',
                        'Clinical Prediction Rules'
                    ]
                },
                {
                    title: 'Integrated Case Studies',
                    duration: '3 Weeks',
                    description: 'Application of diagnostic skills to complex clinical scenarios across various medical specialties.',
                    topics: [
                        'Cardiovascular Case Studies',
                        'Respiratory Case Studies',
                        'Gastrointestinal Case Studies',
                        'Neurological Case Studies',
                        'Multi-system Case Studies'
                    ],
                    assessment: 'Case-based examinations requiring diagnostic reasoning and management planning.'
                }
            ],
            learningOutcomes: [
                'Conduct comprehensive, patient-centered history taking',
                'Perform accurate and thorough physical examinations',
                'Select appropriate diagnostic tests and interpret their results',
                'Formulate differential diagnoses based on clinical findings',
                'Recognize and mitigate cognitive biases in diagnostic reasoning',
                'Document clinical encounters effectively and professionally',
                'Apply evidence-based approaches to clinical decision making'
            ],
            materials: [
                'Evidence-Based Physical Diagnosis (4th Edition) by Steven McGee',
                'Clinician\'s Guide to Laboratory Medicine by Samir Desai',
                'Clinical Examination: A Systematic Guide to Physical Diagnosis by Nicholas Talley',
                'Online access to case studies and simulation software (provided by Hippocampus Academy)',
                'Clinical examination equipment kit (stethoscope, ophthalmoscope, etc. - available for purchase separately)'
            ]
        },
        // Additional medicine courses would be defined here
        
        // Dental Courses
        'advanced-orthodontics': {
            type: 'dental',
            name: 'Advanced Orthodontics',
            duration: '14 Weeks',
            studentLimit: 20,
            price: '4,800',
            instructor: {
                name: 'Dr. Ahmed Al-Farsi',
                title: 'DDS, MS in Orthodontics',
                imageClass: 'dr-ahmed',
                bio: 'Dr. Ahmed Al-Farsi is a leading orthodontist with over 12 years of clinical practice. He earned his DDS from King Abdulaziz University and completed his MS in Orthodontics at the University of Michigan, where he graduated with honors. Dr. Al-Farsi has practiced at several prestigious dental centers in Saudi Arabia and internationally, specializing in complex orthodontic cases and interdisciplinary treatment. As an educator, he combines theoretical knowledge with hands-on clinical experience, helping students develop confidence in orthodontic diagnosis and treatment planning. Dr. Al-Farsi regularly lectures at international conferences and has contributed to the advancement of orthodontic techniques in the region.',
                expertise: [
                    'Contemporary Bracket Systems and Biomechanics',
                    'Clear Aligner Therapy',
                    'Orthognathic Surgery Planning',
                    'Interdisciplinary Adult Orthodontics',
                    'Orthodontic Management of Craniofacial Anomalies'
                ],
                publications: [
                    'Al-Farsi A, et al. (2024). "Comparative Analysis of Self-Ligating and Conventional Bracket Systems in Complex Malocclusions." Journal of Orthodontic Practice.',
                    'Al-Farsi A, et al. (2022). "Clear Aligner Therapy: Advancements and Limitations." International Journal of Dentistry.',
                    'Al-Farsi A, et al. (2020). "Interdisciplinary Approaches to Adult Orthodontic Treatment: A Case Series." Saudi Dental Journal.'
                ]
            },
            curriculumOverview: 'This advanced course provides comprehensive training on modern orthodontic techniques, diagnosis, and treatment planning. Students will learn about contemporary bracket systems, clear aligners, and innovative approaches to complex malocclusions. The course emphasizes evidence-based practice and includes extensive hands-on components with typodont exercises and case-based learning.',
            modules: [
                {
                    title: 'Advanced Orthodontic Diagnosis',
                    duration: '3 Weeks',
                    description: 'Comprehensive approach to orthodontic diagnosis using contemporary methods and technologies.',
                    topics: [
                        'Cephalometric Analysis: Advanced Techniques',
                        '3D Imaging in Orthodontic Diagnosis',
                        'Digital Models and Analysis',
                        'Comprehensive Facial Analysis',
                        'Interdisciplinary Diagnostic Considerations'
                    ]
                },
                {
                    title: 'Contemporary Bracket Systems',
                    duration: '3 Weeks',
                    description: 'In-depth exploration of modern bracket systems, their biomechanics, and clinical applications.',
                    topics: [
                        'Self-Ligating Bracket Systems',
                        'Passive vs. Active Self-Ligation',
                        'Customized Bracket Systems',
                        'Biomechanics and Force Systems',
                        'Bracket Selection for Different Malocclusions'
                    ],
                    assessment: 'Hands-on typodont exercises demonstrating bracket placement and wire progression.'
                },
                {
                    title: 'Clear Aligner Therapy',
                    duration: '3 Weeks',
                    description: 'Comprehensive coverage of clear aligner systems, digital planning, and case selection.',
                    topics: [
                        'Digital Treatment Planning for Aligners',
                        'Attachments and Auxiliaries',
                        'Case Selection and Limitations',
                        'Staging and Sequencing of Tooth Movements',
                        'Hybrid Treatment Approaches'
                    ]
                },
                {
                    title: 'Management of Complex Cases',
                    duration: '3 Weeks',
                    description: 'Strategies for managing challenging orthodontic cases and interdisciplinary treatment planning.',
                    topics: [
                        'Adult Interdisciplinary Orthodontics',
                        'Orthognathic Surgery Cases',
                        'Management of Impacted Teeth',
                        'Orthodontic Considerations in Periodontal Patients',
                        'Treatment of Severe Crowding and Spacing'
                    ]
                },
                {
                    title: 'Clinical Case Reviews',
                    duration: '2 Weeks',
                    description: 'Analysis of treated cases from diagnosis to finish, with discussion of treatment decisions and outcomes.',
                    topics: [
                        'Class I Malocclusion Case Series',
                        'Class II Malocclusion Case Series',
                        'Class III Malocclusion Case Series',
                        'Open Bite and Deep Bite Cases',
                        'Retention and Stability Considerations'
                    ],
                    assessment: 'Case presentation requiring complete analysis and treatment planning of an assigned orthodontic case.'
                }
            ],
            learningOutcomes: [
                'Perform comprehensive orthodontic diagnosis using advanced techniques',
                'Develop evidence-based treatment plans for various malocclusions',
                'Apply biomechanical principles to orthodontic tooth movement',
                'Select appropriate bracket systems and clear aligners based on case requirements',
                'Manage complex orthodontic cases requiring interdisciplinary approaches',
                'Plan and execute digital workflows for clear aligner therapy',
                'Evaluate treatment outcomes and implement effective retention protocols'
            ],
            materials: [
                'Contemporary Orthodontics (6th Edition) by William R. Proffit',
                'Self-Ligation in Orthodontics by Theodore Eliades',
                'Clear Aligner Technique by Sandra Tai',
                'Digital access to orthodontic treatment planning software (provided by Hippocampus Academy)',
                'Orthodontic typodont kit (bracket systems and wires provided for in-class exercises)'
            ]
        }
        // Additional dental courses would be defined here
    };
    
    // Return course data if found, or null if not found
    if (courseType === 'medicine') {
        return courseDatabase[courseSlug] && courseDatabase[courseSlug].type === 'medicine' ? courseDatabase[courseSlug] : null;
    } else if (courseType === 'dental') {
        return courseDatabase[courseSlug] && courseDatabase[courseSlug].type === 'dental' ? courseDatabase[courseSlug] : null;
    }
    
    return null;
}
