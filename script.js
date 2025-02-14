document.addEventListener('DOMContentLoaded', function() {
    // IMT Calculator
    const calculateButton = document.getElementById('calculate');
    if (calculateButton) {
        calculateButton.addEventListener('click', function() {
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value) / 100;
            const age = parseInt(document.getElementById('age').value);
            const gender = document.querySelector('input[name="gender"]:checked');

            if (weight && height && age && gender) {
                const imt = weight / (height * height);
                let interpretation = '';

                if (imt < 18.5) {
                    interpretation = 'Kurus';
                } else if (imt < 25) {
                    interpretation = 'Ideal';
                } else if (imt < 30) {
                    interpretation = 'Gemuk';
                } else {
                    interpretation = 'Obesitas';
                }

                document.getElementById('imt-result').textContent = imt.toFixed(2);
                document.getElementById('imt-interpretation').textContent = interpretation;
            } else {
                alert('Mohon isi semua data.');
            }
        });
    }

    function getFoodRecommendations(latitude, longitude) {
        // Placeholder function to simulate fetching food recommendations
        let cityName = 'Contoh Nama Kota';
        let foodRecommendation = 'Maaf, rekomendasi makanan tidak tersedia untuk lokasi Anda saat ini.';

        document.getElementById('city-name').textContent = cityName;
        document.getElementById('food-recommendation').textContent = foodRecommendation;
    }

    // Food Recommendation
    const detectLocationButton = document.getElementById('detect-location');
    if (detectLocationButton) {
        detectLocationButton.addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const locationInfo = `Latitude: ${latitude}, Longitude: ${longitude}`;
                    document.getElementById('location-info').textContent = locationInfo;

                    // Construct search query URL
                    const searchQuery = `https://www.google.com/search?q=rekomendasi+makanan+sehat+di+dekat+${latitude},${longitude}`;

                    // Open search query in new tab
                    window.open(searchQuery, '_blank');

                }, function(error) {
                    document.getElementById('location-info').textContent = 'Gagal mendapatkan lokasi.';
                });
            } else {
                document.getElementById('location-info').textContent = 'Geolocation tidak didukung oleh browser Anda.';
            }
        });
    }

    // Function to show/hide sections
   function showSection(sectionId) {
        console.log('showSection called with:', sectionId);
        const sections = ['welcome', 'features', 'imt-calculator', 'food-recommendation-section', 'nutrition-analysis-section', 'faq-section', 'diagnosis', 'hepatitis-b-diagnosis'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                if (sectionId === 'welcome') {
                    section.style.display = (id === 'welcome' || id === 'features' || id === 'diagnosis') ? 'block' : 'none';
                }
                else {
                  section.style.display = (id === sectionId) ? 'block' : 'none';
                }
            }
        });
    }

    // Event listeners for buttons to show sections
    document.getElementById('imt-calculator-button').addEventListener('click', () => showSection('imt-calculator'));
    document.getElementById('food-recommendation-button').addEventListener('click', () => showSection('food-recommendation-section'));
    document.getElementById('nutrition-analysis-button').addEventListener('click', () => showSection('nutrition-analysis-section'));
    document.getElementById('faq-button').addEventListener('click', () => showSection('faq-section'));

    // Add event listeners for diagnosis buttons
    document.getElementById('diagnosis-tool-1').addEventListener('click', () => showSection('hepatitis-b-diagnosis'));
    document.getElementById('diagnosis-tool-2').addEventListener('click', () => {
        window.open('https://scintillating-sherbet-503f82.netlify.app/', '_blank');
    });
    document.getElementById('diagnosis-tool-3').addEventListener('click', () => {
        window.open('https://capable-parfait-349270.netlify.app/', '_blank');
    });
    document.getElementById('diagnosis-tool-4').addEventListener('click', () => {
        window.open('https://aistudio.google.com/u/2/prompts/new_chat', '_blank');
    });

    // Home link functionality
    const homeLink = document.getElementById('home-link');
    if (homeLink) {
        homeLink.addEventListener('click', () => showSection('welcome'));
    }

    const hbvDiagnoseButton = document.getElementById('hbv-diagnose');
    if (hbvDiagnoseButton) {
        hbvDiagnoseButton.addEventListener('click', function() {
            const age = parseInt(document.getElementById('hbv-age').value);
            const vaccination = document.querySelector('input[name="vaccination"]:checked');
            const riskFactors = document.getElementById('risk-factors').value;

            let result = '';
            let recommendation = '';

            if (age && vaccination && riskFactors) {
                if (age < 1 || age > 100) {
                    result = 'Usia tidak valid.';
                    recommendation = 'Mohon masukkan usia yang benar.';
                } else {
                    let riskLevel = 'rendah';
                    if (riskFactors.toLowerCase().includes('transfusi darah') || riskFactors.toLowerCase().includes('penggunaan narkoba suntik')) {
                        riskLevel = 'tinggi';
                    }

                    if (vaccination.value === 'unvaccinated' && riskLevel === 'tinggi') {
                        result = 'Risiko tinggi terinfeksi Hepatitis B.';
                        recommendation = 'Disarankan untuk segera melakukan pemeriksaan HBsAg dengan RDT dan konsultasi dengan dokter spesialis.';
                    } else if (vaccination.value === 'unvaccinated' && riskLevel === 'rendah') {
                        result = 'Risiko rendah, namun tetap berpotensi terinfeksi Hepatitis B.';
                        recommendation = 'Disarankan untuk melakukan pemeriksaan HBsAg dan mempertimbangkan vaksinasi Hepatitis B.';
                    } else {
                        result = 'Risiko rendah terinfeksi Hepatitis B.';
                        recommendation = 'Tetap menjaga kebersihan diri dan menghindari faktor risiko. Pertimbangkan skrining ulang jika ada paparan risiko baru.';
                    }
                }
            } else {
                result = 'Mohon isi semua data.';
                recommendation = 'Mohon lengkapi semua informasi yang diperlukan.';
            }

            document.getElementById('hbv-result').textContent = result;
            document.getElementById('hbv-recommendation').textContent = recommendation;
        });
    }
});
