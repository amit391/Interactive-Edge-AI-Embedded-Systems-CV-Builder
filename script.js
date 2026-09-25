document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial State Data Store Array Mapping Core CV Content
    let experienceData = [
        {
            title: "Freelance Edge AI & ML Engineer",
            meta: "Remote",
            date: "Apr 2024 – Present",
            bullets: `AI Surveillance Architecture: Designed a multi-camera AI surveillance system integrated with Flask and YOLOv8 for optimized real-time edge processing (https://github.com/amit391/Multi-Camera-AI-Surveillance-System-Flask-YOLOv8-).
            \nReal-Time Object Detection: Developed high-throughput object detection applications using the YOLOv5 framework, focusing on model efficiency on target hardware platforms (https://github.com/amit391/Real-Time-Object-detection-using-Yolov5).
            \nPredictive Analytics: Built a market trend prediction and recommendation system utilizing Python and the PyTorch deep learning framework (https://github.com/amit391/Market-trend-prediction).
            \nComputer Vision Systems: Created an interactive 360-degree panorama photo stitcher(https://github.com/amit391/360-Panorama-Photo-Stitcher-Viewer)
            \nVideo Streaming: chat server utilizing haarcascade_frontalface for efficient edge detection (https://github.com/amit391/Real-Time-Video-Streaming-Chat-Server).`
        },
        {
            title: "Technical Trainer",
            meta: "Teaching & Professional Training, Bihar",
            date: "Sep 2021 – Mar 2024",
            bullets: "Provided comprehensive professional training to engineering students in advanced C/C++ programming and foundational embedded system architectures."
        },
        {
            title: "Embedded Systems Engineer",
            meta: "Multivirt Pvt. Ltd., New Delhi",
            date: "Sep 2017 – Apr 2020",
            bullets: "Firmware Development: Engineered commercial-grade firmware using embedded IDEs, debuggers, and simulators to dramatically streamline release workflows.\nNetwork & Connectivity: Configured Wi-Fi hotspots on Raspberry Pi 3 platforms leveraging external wireless adapters for reliable remote diagnostics.\nSecurity Modules: Designed and deployed robust multi-layer data encryption/decryption firmware modules protecting sensitive device transmissions.\nTechnical Docs: Authored comprehensive technical documentation, architecture specifications, and complete operational manuals."
        },
        {
            title: "Embedded Trainee",
            meta: "Cetpa Infotech Pvt. Ltd., Noida",
            date: "Mar 2017 – Nov 2017",
            bullets: "Completed rigorous certification tracks covering Embedded Tools, Embedded C, and Linux Internals with hands-on development across ARM (LPC2148), AVR, Arduino, and ESP32."
        }
    ];

    // 2. Static Content Input Form Mapping Direct Configuration Array 
    const staticFieldMappings = [
        { id: 'form-name', cvId: 'cv-name', prefix: '' },
        { id: 'form-target', cvId: 'cv-target', prefix: '' },
        { id: 'form-phone', cvId: 'cv-phone', prefix: '■ ' },
        { id: 'form-email', cvId: 'cv-email', prefix: '■ ' },
        { id: 'form-location', cvId: 'cv-location', prefix: '■ ' },
        { id: 'form-linkedin', cvId: 'cv-linkedin', prefix: '■ ' },
        { id: 'form-github', cvId: 'cv-github', prefix: '■ ' },
        { id: 'form-summary', cvId: 'cv-summary', prefix: '' },
        { id: 'form-skill-ai', cvId: 'cv-skill-ai', prefix: '' },
        { id: 'form-skill-hw', cvId: 'cv-skill-hw', prefix: '' },
        { id: 'form-skill-net', cvId: 'cv-skill-net', prefix: '' },
        { id: 'form-skill-tools', cvId: 'cv-skill-tools', prefix: '' },
        { id: 'form-skill-lang', cvId: 'cv-skill-lang', prefix: '' },
        { id: 'form-edu1-deg', cvId: 'cv-edu1-deg', prefix: '' },
        { id: 'form-edu1-inst', cvId: 'cv-edu1-inst', prefix: '' },
        { id: 'form-edu1-meta', cvId: 'cv-edu1-meta', prefix: '' },
        { id: 'form-edu2-deg', cvId: 'cv-edu2-deg', prefix: '' },
        { id: 'form-edu2-inst', cvId: 'cv-edu2-inst', prefix: '' },
        { id: 'form-edu2-meta', cvId: 'cv-edu2-meta', prefix: '' }
    ];

    // Hook Input change capture events for basic text modifications and active links
    staticFieldMappings.forEach(mapping => {
        const inputElement = document.getElementById(mapping.id);
        const cvDisplayElement = document.getElementById(mapping.cvId);
        
        if (inputElement && cvDisplayElement) {
            inputElement.addEventListener('input', () => {
                cvDisplayElement.textContent = mapping.prefix + inputElement.value;
                
                if (mapping.id === 'form-phone') {
                    const cleanPhone = inputElement.value.replace(/\s+/g, '').trim();
                    cvDisplayElement.setAttribute('href', 'tel:' + cleanPhone);
                }

                if (mapping.id === 'form-email') {
                    cvDisplayElement.setAttribute('href', 'mailto:' + inputElement.value.trim());
                }
                
                if (mapping.id === 'form-linkedin' || mapping.id === 'form-github') {
                    let rawUrl = inputElement.value.trim();
                    if (rawUrl && !rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
                        rawUrl = 'https://' + rawUrl;
                    }
                    cvDisplayElement.setAttribute('href', rawUrl);
                }
            });
        }
    });

    // 3. Dynamic Experience Section DOM Elements References
    const formExperienceContainer = document.getElementById('experience-form-container');
    const cvExperienceContainer = document.getElementById('cv-experience-container');
    const addNewExperienceButton = document.getElementById('add-exp-btn');

    // Helper function to build bullet point HTML strings safely
    //function parseBulletPoints(bulletString) {
      //  return bulletString.split('\n')
        //    .filter(b => b.trim() !== '')
          //  .map(b => {
            //    if (b.includes(':')) {
              //      const colonIndex = b.indexOf(':');
                //    const boldHeading = b.substring(0, colonIndex).trim();
                  //  const regularText = b.substring(colonIndex + 1).trim();
                    //return `<li><strong>${boldHeading}:</strong> ${regularText}</li>`;
                //}
                //return `<li>${b}</li>`;
            //}).join('');
    //}
    // Helper function to build bullet point HTML strings safely
    // Helper function to build bullet point HTML strings safely and parse inline hyperlinks
    function parseBulletPoints(bulletString) {
        return bulletString.split('\n')
            .filter(b => b.trim() !== '')
            .map(b => {
                // 🟢 REGEX ENGINE: Detects github URLs inside text or parentheses and wraps them in an active clickable tag
                let processedText = b.replace(/(github\.com\/[^\s\)]+)/g, (match) => {
                    // Remove trailing symbols like commas, periods, or parentheses accidentally caught by regex
                    let cleanUrl = match.replace(/[.,\)]+\$/, '');
                    return `<a href="https://${cleanUrl}" target="_blank" style="color: var(--secondary); text-decoration: underline; font-weight: 500;">${cleanUrl}</a>`;
                });
                
                // Parse out bold category prefixes (split on the first colon)
                if (processedText.includes(':')) {
                    const colonIndex = processedText.indexOf(':');
                    const boldHeading = processedText.substring(0, colonIndex).trim();
                    const regularText = processedText.substring(colonIndex + 1).trim();
                    return `<li><strong>${boldHeading}:</strong> ${regularText}</li>`;
                }
                return `<li>${processedText}</li>`;
            }).join('');
    }

    // Renders the editable sidebar inputs independently
    function renderFormInputs() {
        if (!formExperienceContainer) return;
        formExperienceContainer.innerHTML = '';

        experienceData.forEach((job, index) => {
            const jobFormItem = document.createElement('div');
            jobFormItem.className = 'exp-block-form';
            jobFormItem.innerHTML = `
                <button class="btn-delete" data-index="${index}">✕ Remove</button>
                <div class="form-group">
                    <label>Job Title / Role</label>
                    <input type="text" class="exp-input-title" data-index="${index}" value="${job.title}">
                </div>
                <div class="form-group">
                    <label>Company / Location</label>
                    <input type="text" class="exp-input-meta" data-index="${index}" value="${job.meta}">
                </div>
                <div class="form-group">
                    <label>Timeline Dates</label>
                    <input type="text" class="exp-input-date" data-index="${index}" value="${job.date}">
                </div>
                <div class="form-group">
                    <label>Bullets Description (one bullet per line)</label>
                    <textarea class="exp-input-bullets" data-index="${index}">${job.bullets}</textarea>
                </div>
            `;
            formExperienceContainer.appendChild(jobFormItem);
        });

        // Re-attach input event listeners to the fresh sidebar elements
        bindInputSyncEvents();
    }

    // Renders the printable CV preview panel independently (FIXES REPETITION)
    function renderCVPreviewOnly() {
        if (!cvExperienceContainer) return;
        cvExperienceContainer.innerHTML = '';

        experienceData.forEach((job) => {
            const jobCVCard = document.createElement('div');
            jobCVCard.className = 'cv-exp-item';
            jobCVCard.innerHTML = `
                <div class="cv-exp-header">
                    <div>
                        <span class="cv-exp-title">${job.title}</span>
                        <span class="cv-exp-meta">| ${job.meta}</span>
                    </div>
                    <div class="cv-exp-date">${job.date}</div>
                </div>
                <ul class="cv-exp-bullets">
                    ${parseBulletPoints(job.bullets)}
                </ul>
            `;
            cvExperienceContainer.appendChild(jobCVCard);
        });
    }

    // Full synchronization call
    function fullSyncAndRender() {
        renderFormInputs();
        renderCVPreviewOnly();
    }

    /*function bindInputSyncEvents() {
        // Handle deletion triggers
        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', (event) => {
                const targetIdx = parseInt(event.target.getAttribute('data-index'));
                experienceData.splice(targetIdx, 1);
                fullSyncAndRender();
            });
        });

        // Listen for live keystrokes across all forms and directly update the data array
        const inputFieldsConfig = [
            { selector: '.exp-input-title', key: 'title' },
            { selector: '.exp-input-meta', key: 'meta' },
            { selector: '.exp-input-date', key: 'date' },
            { selector: '.exp-input-bullets', key: 'bullets' }
        ];

        inputFieldsConfig.forEach(config => {
            document.querySelectorAll(config.selector).forEach(field => {
                field.addEventListener('input', (event) => {
                    const activeIndex = parseInt(event.target.getAttribute('data-index'));
                    experienceData[activeIndex][config.key] = event.target.value;
                    
                    // Instantly sync the clean text array straight down to the sheet canvas
                    renderCVPreviewOnly();
                });
            });
        });
    } */


        function bindInputSyncEvents() {
        // Handle deletion triggers
            document.querySelectorAll('.btn-delete').forEach(button => {
                button.removeEventListener('click', handleDelete); // Clean old event layers
                button.addEventListener('click', handleDelete);
            });

            const inputFieldsConfig = [
                { selector: '.exp-input-title', key: 'title' },
                { selector: '.exp-input-meta', key: 'meta' },
                { selector: '.exp-input-date', key: 'date' },
                { selector: '.exp-input-bullets', key: 'bullets' }
            ];

            inputFieldsConfig.forEach(config => {
                // 🟢 FIX: Explicitly target controls inside the experience container to stop interference from contact forms
                formExperienceContainer.querySelectorAll(config.selector).forEach(field => {
                // Remove any pre-existing listeners before attaching a clean one
                    field.replaceWith(field.cloneNode(true)); 
                });
        
            formExperienceContainer.querySelectorAll(config.selector).forEach(field => {
                field.addEventListener('input', (event) => {
                    const activeIndex = parseInt(event.target.getAttribute('data-index'));
                    if (!isNaN(activeIndex) && experienceData[activeIndex]) {
                        experienceData[activeIndex][config.key] = event.target.value;
                        renderCVPreviewOnly(); // Dynamically updates preview layout canvas
                    }
                });
            });
        });
    }
    function handleDelete(event) {
        const targetIdx = parseInt(event.target.getAttribute('data-index'));
        experienceData.splice(targetIdx, 1);
        fullSyncAndRender();
    }

    // Add new job item block
    if (addNewExperienceButton) {
        addNewExperienceButton.addEventListener('click', () => {
            experienceData.push({
                title: "New Role Title Position",
                date: "Timeline Period",
                bullets: "Core achievement detail line metrics entries."
                });
                fullSyncAndRender();
            });
        }
        // Wire print system print button action
        const printButton = document.getElementById('print-btn');
        if (printButton) {
            printButton.addEventListener('click', () => {
                window.print();
            });
        }
        // Initial system bootstrap trigger
        fullSyncAndRender();
    });
