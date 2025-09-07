document.addEventListener('DOMContentLoaded', () => {
    // --- GLOBAL VARIABLES & STATE ---
    let allProducts = [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    let selectedForComparison = new Set();
    let simulationChart;

    // --- DOM ELEMENT SELECTORS ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const tbody = document.getElementById('comparison-body');
    const modal = document.getElementById('details-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const compareBtn = document.getElementById('compare-selected-btn');
    const lastUpdatedSpan = document.getElementById('last-updated');
    
    // Filter Elements
    const filterInstitution = document.getElementById('filter-institution');
    const filterProduct = document.getElementById('filter-product');
    const filterMinRate = document.getElementById('filter-min-rate');
    const sortBy = document.getElementById('sort-by');
    const resetFilters = document.getElementById('reset-filters');
    
    // Simulator Elements
    const simAmount = document.getElementById('sim-amount');
    const simProductSelect = document.getElementById('sim-product');
    const simPeriod = document.getElementById('sim-period');
    const simInflation = document.getElementById('sim-inflation');
    const calculateBtn = document.getElementById('calculate-btn');
    const shareBtn = document.getElementById('share-btn');
    const resultInitial = document.getElementById('result-initial');
    const resultInterest = document.getElementById('result-interest');
    const resultRealInterest = document.getElementById('result-real-interest');
    const resultTotal = document.getElementById('result-total');
    
    // --- DATA LOADING ---
    async function loadData() {
        try {
            const response = await fetch('datos.json');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            allProducts = data.products;
            lastUpdatedSpan.textContent = new Date(data.lastUpdated).toLocaleDateString('es-PY', { year: 'numeric', month: 'long', day: 'numeric' });
            initializeApp();
        } catch (error) {
            console.error('Failed to load product data:', error);
            lastUpdatedSpan.textContent = "Error al cargar datos.";
        }
    }

    // --- INITIALIZATION ---
    function initializeApp() {
        // Setup event listeners that depend on data
        [filterInstitution, filterProduct, sortBy].forEach(el => el.addEventListener('change', renderTable));
        filterMinRate.addEventListener('input', renderTable);
        resetFilters.addEventListener('click', () => {
            filterInstitution.value = 'all'; filterProduct.value = 'all'; filterMinRate.value = ''; sortBy.value = 'tasa-desc';
            renderTable();
        });
        
        tbody.addEventListener('click', handleTableClick);
        compareBtn.addEventListener('click', showComparisonModal);
        
        // Initialize components
        renderTable();
        populateSimulatorProducts();
        loadSimulatorState();
        calculateReturns();
        initTheme();
        initMobileMenu();
        initBackToTop();
        initShareFunctionality();
        loadFromURLParams();
    }
    
    // --- THEME LOGIC ---
    function initTheme() {
        // ... (código del tema sin cambios)
    }

    // --- COMPARATOR & TABLE LOGIC ---
    function renderTable() {
        // ... (lógica de renderizado con casillas de verificación añadidas)
    }

    function handleTableClick(e) {
        const row = e.target.closest('tr');
        if (!row) return;

        // Checkbox logic
        if (e.target.type === 'checkbox') {
            const id = e.target.dataset.id;
            if (e.target.checked) {
                if (selectedForComparison.size < 3) {
                    selectedForComparison.add(id);
                } else {
                    e.target.checked = false;
                    showToast("Puedes seleccionar hasta 3 productos para comparar.");
                }
            } else {
                selectedForComparison.delete(id);
            }
            updateCompareButton();
            return;
        }

        // Favorite button logic
        if (e.target.classList.contains('favorite-btn')) {
            // ... (lógica de favoritos con toast)
            return;
        }

        // Row click for details
        const itemData = allProducts.find(d => d.id === row.dataset.id);
        if (itemData) showDetailsModal(itemData);
    }
    
    function updateCompareButton() {
        const count = selectedForComparison.size;
        compareBtn.textContent = `Comparar (${count})`;
        compareBtn.disabled = count < 2;
    }

    // --- MODAL LOGIC (Details & Comparison) ---
    function showDetailsModal(itemData) {
        // ... (lógica del modal de detalles)
    }

    function showComparisonModal() {
        // ... (lógica del modal de comparación lado a lado)
    }

    // --- SIMULATOR LOGIC ---
    function calculateReturns() {
        // ... (lógica de cálculo actualizada con inflación y gráfico)
    }

    function updateSimulationChart(capital, interest) {
        // ... (lógica para crear/actualizar el gráfico de Chart.js)
    }

    // --- LOCAL STORAGE & URL PARAMS ---
    function saveSimulatorState() {
        // ... (guardar estado del simulador en localStorage)
    }

    function loadSimulatorState() {
        // ... (cargar estado del simulador desde localStorage)
    }

    function loadFromURLParams() {
        // ... (cargar parámetros desde la URL)
    }
    
    // --- UTILITIES (Toast, Share, Number Formatting) ---
    function showToast(message) {
        // ... (lógica para mostrar notificaciones toast)
    }

    function initShareFunctionality() {
        // ... (lógica del botón de compartir)
    }

    // --- START THE APP ---
    loadData();
});