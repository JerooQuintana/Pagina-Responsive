let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar")

function cargarProductosCarrito(){

    if(productosEnCarrito && productosEnCarrito.length > 0){

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
        
            const div = document.createElement("div"); 
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>titulo</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
            `;
            
            contenedorCarritoProductos.append(div);
        });
       
    }
    else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar()
        actualizarTotal()
}
cargarProductosCarrito()

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
    
    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito);
    })

}
function eliminarDelCarrito(e){
    
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito()
}
function actualizarTotal(){
    const totalCalculado =  productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", generarOrdenYEnviarWhatsApp);


function generarOrdenYEnviarWhatsApp() {
    const order = {
        productos: productosEnCarrito,
        total: total.innerText
    };

    // Convert the order object to a formatted string
    const orderString = `
    Muchas Gracias por realizar tu pedido! 
        ¡Orden de Compra!
        Productos:
        ${order.productos.map(producto => `${producto.titulo} x${producto.cantidad} - $${producto.precio * producto.cantidad}`).join('\n')}
        
        Total: ${order.total}
    
        <b>Completa los siguentes espacios por favor!</b>
        Nombre completo:
        DNI:
        Direccion:
        Localidad:
        

    `;

    // You can replace this with the actual WhatsApp API integration
    const whatsappLink = `https://wa.me/3816605580?text=${encodeURIComponent(orderString)}`;
    
    // Open the WhatsApp link
    window.open(whatsappLink, '_blank');
}
