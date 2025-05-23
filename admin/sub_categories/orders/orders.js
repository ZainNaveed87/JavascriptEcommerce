document.addEventListener("DOMContentLoaded", function () {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    const container = document.getElementById("orders-container");

    // --- Helper functions ---
    function saveStatusArrays() {
        localStorage.setItem("pendingOrders", JSON.stringify(pendingOrders));
        localStorage.setItem("completedOrders", JSON.stringify(completedOrders));
        localStorage.setItem("cancelledOrders", JSON.stringify(cancelledOrders));
    }

    function removeFromAllArrays(orderId) {
        pendingOrders = pendingOrders.filter(o => o.id !== orderId);
        completedOrders = completedOrders.filter(o => o.id !== orderId);
        cancelledOrders = cancelledOrders.filter(o => o.id !== orderId);
    }

    // --- Initialize status arrays from localStorage or fill from orders ---
    let pendingOrders = JSON.parse(localStorage.getItem("pendingOrders")) || [];
    let completedOrders = JSON.parse(localStorage.getItem("completedOrders")) || [];
    let cancelledOrders = JSON.parse(localStorage.getItem("cancelledOrders")) || [];

    // Assign unique id to each order if not present
    orders.forEach((order, idx) => {
        if (!order.id) order.id = order.orderId || `order_${idx}_${Date.now()}`;
    });

    // On first load, fill status arrays if empty
    if (pendingOrders.length === 0 && completedOrders.length === 0 && cancelledOrders.length === 0) {
        orders.forEach(order => {
            if (!order.status) order.status = "Pending";
            if (order.status === "Pending") pendingOrders.push(order);
            else if (order.status === "Completed") completedOrders.push(order);
            else if (order.status === "Cancel") cancelledOrders.push(order);
        });
        saveStatusArrays();
    }

    // --- Render orders (from all orders array, for admin view) ---
    container.innerHTML = "";
    if (orders.length === 0) {
        container.innerHTML = "<p style='padding:24px;'>No orders found.</p>";
        return;
    }

    orders.forEach((order, idx) => {
        const slipDiv = document.createElement("div");
        slipDiv.style.width = "350px";
        slipDiv.style.background = "#fff";
        slipDiv.style.borderRadius = "10px";
        slipDiv.style.boxShadow = "0 2px 8px #0001";
        slipDiv.style.marginBottom = "24px";
        slipDiv.style.padding = "18px";
        slipDiv.style.display = "flex";
        slipDiv.style.flexDirection = "column";
        slipDiv.style.alignItems = "center";

        if (!order.status) order.status = "Pending";

        slipDiv.innerHTML = `
            <h3 style="color:#388e3c;">Order #${idx + 1}</h3>
            <img src="${order.slipImage}" alt="Order Slip" style="width:90%;border-radius:8px;box-shadow:0 1px 4px #0002;margin-bottom:10px;">
            <div style="font-size:14px;text-align:left;width:100%;">
                <strong>Name:</strong> ${order.billingDetails.firstName} ${order.billingDetails.lastName}<br>
                <strong>Email:</strong> ${order.billingDetails.email}<br>
                <strong>Phone:</strong> ${order.billingDetails.phone}<br>
                <strong>Total:</strong> Rs: ${order.total}<br>
                <strong>Products:</strong>
                <ul style="padding-left:18px;">
                    ${order.cartProducts.map(p => `<li>${p.name} - Rs: ${p.price}</li>`).join("")}
                </ul>
                <label style="margin-top:8px;display:block;">
                    <strong>Status:</strong>
                    <select class="order-status-dropdown" data-id="${order.id}" style="margin-left:8px;">
                        <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Completed" ${order.status === "Completed" ? "selected" : ""}>Completed</option>
                        <option value="Cancel" ${order.status === "Cancel" ? "selected" : ""}>Cancel</option>
                    </select>
                </label>
            </div>
        `;
        container.appendChild(slipDiv);
    });

    // --- Dropdown change event ---
    container.addEventListener("change", function (e) {
        if (e.target.classList.contains("order-status-dropdown")) {
            const orderId = e.target.getAttribute("data-id");
            const newStatus = e.target.value;

            // Find order in orders array and update status
            const order = orders.find(o => o.id === orderId);
            if (order) order.status = newStatus;

            // Remove from all status arrays, then add to correct one
            removeFromAllArrays(orderId);
            if (newStatus === "Pending") pendingOrders.push(order);
            else if (newStatus === "Completed") completedOrders.push(order);
            else if (newStatus === "Cancel") cancelledOrders.push(order);

            // Save all arrays
            localStorage.setItem("orders", JSON.stringify(orders));
            saveStatusArrays();
        }
    });
});