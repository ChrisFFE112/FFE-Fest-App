function showSection(sectionId) {
    document.getElementById('grill').style.display = 'none';
    document.getElementById('tresen').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

function calculateTotal() {
    const section = document.querySelector('.section[style="display: block;"]');
    if (!section) return;

    let total = 0;
    let pfand = 0;
    let orderList = '';

    const items = section.querySelectorAll('.item input');
    items.forEach(input => {
        const qty = parseInt(input.value) || 0;
        const price = parseFloat(input.dataset.price) || 0;
        const itemPfand = parseFloat(input.dataset.pfand) || 0;
        const label = input.previousElementSibling.textContent.split(' (')[0];

        if (qty > 0) {
            total += qty * price;
            pfand += qty * itemPfand;
            orderList += `${qty} x ${label}<br>`;
        }
    });

    // Extra Pfand für Tresen
    if (section.id === 'tresen') {
        const extraPfandInput = document.getElementById('extra-pfand');
        const extraQty = parseInt(extraPfandInput.value) || 0;
        pfand += extraQty * 1.00; // Passe den Preis an
        if (extraQty > 0) orderList += `${extraQty} x Extra Pfand-Gläser<br>`;
    }

    const grandTotal = total + pfand;
    document.getElementById('result').innerHTML = `Bestellung:<br>${orderList}<br>Gesamtpreis: ${grandTotal.toFixed(2)} € (davon Pfand: ${pfand.toFixed(2)} €)`;
}

function resetOrder() {
    document.querySelectorAll('input[type="number"]').forEach(input => input.value = 0);
    document.getElementById('result').innerHTML = '';
}

// Standardmäßig Grill anzeigen
showSection('grill');