async function verifyNPI(npi) {
    // Basic format check before hitting the API
    if (!/^\d{10}$/.test(npi)) {
      return { valid: false, reason: 'NPI number must be exactly 10 digits' };
    }

    try {
      const response = await fetch(
        `https://npi-check.angeloraphaelmendoza.workers.dev/?number=${encodeURIComponent(npi)}`
      );

      if (!response.ok) {
        return { valid: false, reason: 'NPI API request failed' };
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return { valid: true, data: data.results[0] }; // Return first match
      } else {
        return { valid: false, reason: 'NPI not found' };
      }
    } catch (error) {
      return { valid: false, reason: 'Network error: ' + error.message };
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#CreateCustomerForm'); // check actual id in HTML

    form.addEventListener(
      'submit',
      async function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        const npi = document.getElementById('NPI').value.trim();

        const isValid = await verifyNPI('1033270160');

        if (isValid) {
          
        }
      },
      true
    );
  });

  (async () => {
    const isValid = await verifyNPI('1033270160');
    console.log('verify NPI', isValid); // true or false
  })();