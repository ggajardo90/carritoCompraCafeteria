
// Activacion barra de busqueda
// let search = document.querySelector('.search-box');

// document.querySelector('#search-icon').onclick = () => {
//     search.classList.toggle('active');
//     navbar.classList.remove('active');
// }


// // Activacion navbar
// let navbar = document.querySelector('.navbar');

// document.querySelector('#menu-icon').onclick = () => {
//     navbar.classList.toggle('active');
//     search.classList.remove('active');
// }


// window.onscroll = () =>{
//     navbar.classList.remove('active');
//     search.classList.remove('active');
// }




// let header = document.querySelector('header');

// window.addEventListener('scroll',() => {
//     header.classList.toggle('shadow', window.scrollY > 0);
// });




// CARRITO DE COMPRAS

//PASO 1 CREAR VARIABLES 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#product');
let productosCarrito = [];



// PASO 2 FUNCIONES PARA LOS EVENTLISTENER
cargarEventListeners();
function cargarEventListeners() {
    
    //cuando agregas un producto precionando ADD TO CART
    listaProductos.addEventListener('click', agregarProducto);


    //ELIMINA PRTODUCTOS DEL CARRITO 

    carrito.addEventListener('click', eliminarCurso);

    //muestra los cursos del local storage
    document.addEventListener('DOMContentLoaded',()=>{
        productosCarrito = JSON.parse(localStorage.getItem('carrito')) || []
        carritoHTML();
    });

    vaciarCarritoBtn.addEventListener('click', () =>{
        productosCarrito = [] //reseteamos el arreglo

        carritoHTML();//Elimina todo el html
    } );
}



// PASO 3 FUNCIONES

function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {

        const productoSeleccionado = e.target.parentElement.parentElement;

        leerDatosProducto(productoSeleccionado);
    }
}


//ELIMINA UNCURSO DEL CARRITO

function eliminarCurso(e){
    if (e.target.classList.contains('bx')) {
        const productoId = e.target.parentElement.getAttribute('data-id');

        //Elimina del arreglo de productoCarrito por el data-id
        productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);

        carritoHTML();
    }
}



//PASO 4 lee el contenido del html al que le dimos click y extrae la info del producto

function leerDatosProducto(producto) {

    // CREAR OBJETO CON EL CONTENIDO DEL PRODUCTO ACTUAL

    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //PASO 8 REVISA SI UN ELEMTO YA EXISTE EN EL CARRITO

    const existe = productosCarrito.some(producto => producto.id === infoProducto.id);

    if (existe){
        //actualizamos la cantidad del carrito
        const productos = productosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto //RETORNA EL OBJETO ACTUALIZADO
            }else{
                return producto;// RETORNA LOS OBJETOS QUE NO SON LOS DUPLICADOS
            }
        });
        productosCarrito = [...productos]

    }else{
        //PASO 5 AGREGA ELEMENTOS AL ARREGLO DE CARRITO
    productosCarrito = [...productosCarrito, infoProducto];
    }

    carritoHTML();
}

//PASO 6 MUESTRA EL CARRITO DE COMPRA EN HTML

function carritoHTML() {

    //PASO 7 LIMPIAR EL HTML

    limpiarHtml();

    //RECORRE EL CARRITO Y GENERA EL HTML
    productosCarrito.forEach((producto) => {
        const {imagen,titulo,precio,cantidad,id} = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
        
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>

            <td>
                <a href='#' class='borrar-cursos' data-id="${id}"><i class=' bx bxs-trash' ></i></a>
            </td>

        `;

        //PASO 7 AGREGA EL HTML DEL CARRTIO EN EL TBODY
        contenedorCarrito.appendChild(row);
    });

    //AGREGAR CARRITO DE COMPRAS AL LOCAL STORAGE

    sincronizarStorage()
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
}

//PASO 7 ELIMINA LOS CURSOS DEL TABLE BODY

function limpiarHtml() {
    //forma lenta
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}