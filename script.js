const stockCargadores = [
    {
        id: 1,
        nombre: "Adaptador de enchufe",
        cantidad: 1,
        desc: "Adaptador para enchufes del exterior",
        precio: 350,
        img: "./img/cargadores/adapter.jpg",
    },
    {
        id: 2,
        nombre: "Cargador USB - C",
        cantidad: 1,
        desc: "Cargador turbo power USB con entrada tipo C",
        precio: 7990,
        img: "./img/cargadores/tipoC.jpg",
    },
    {
        id: 3,
        nombre: "Cargador USB - Dual",
        cantidad: 1,
        desc: "Cargador usb con doble puerto USB",
        precio: 2490,
        img: "./img/cargadores/turbo.jpg",
    },
    {
        id: 4,
        nombre: "Cargador Smart Watch",
        cantidad: 1,
        desc: "Cargador inalambrico SmartWatch",
        precio: 2800,
        img: "./img/cargadores/inalambrico.jpg",
    },
    {
        id: 5,
        nombre: "Cargador portatil - 1000maH",
        cantidad: 1,
        desc: "Cargador portatil - 1000maH",
        precio: 3200,
        img: "./img/cargadores/portatil.jpeg",
    },
    {
        id: 6,
        nombre: "Cargador portatil - 5000maH",
        cantidad: 1,
        desc: "Cargador portatil - 5000maH",
        precio: 5000,
        img: "./img/cargadores/power bank.jpg",
    },
    {
        id: 7,
        nombre: "Cargador portatil LED - 5000maH",
        cantidad: 1,
        desc: "Cargador portatil con indicador LED - 5000maH",
        precio: 5000,
        img: "./img/cargadores/portatil con LED.jpeg",
    },
    {
        id: 8,
        nombre: "Protector de cable",
        cantidad: 1,
        desc: "come cable protector de cable",
        precio: 890,
        img: "./img/cargadores/come cable animales.jpeg",
    },
    {
        id: 9,
        nombre: "Protector de Cable",
        cantidad: 1,
        desc: "come cable protector de cable",
        precio: 890,
        img: "./img/cargadores/come cable.jpeg",
    },

];

const stockAuriculares = [
    {
        id: 10,
        nombre: "Auricular lightning con cable",
        cantidad: 1,
        desc: "Auricular para iphone con cable",
        precio: 3000,
        img: "./img/auriculares/auri lighting.jpeg",
    },
    {
        id: 11,
        nombre: "Auricular bluetooth i15S",
        cantidad: 1,
        desc: "Auricular bluetooth",
        precio: 8400,
        img: "./img/auriculares/earpods.jpg",
    },
    {
        id: 12,
        nombre: "Protector airpods Disney",
        cantidad: 1,
        desc: "Protector de airpods motivo Disney",
        precio: 1400,
        img: "./img/auriculares/protectores disney.jpeg",
    },
    {
        id: 13,
        nombre: "Auriculares manos libres Samsung",
        cantidad: 1,
        desc: "Auriculares manos libres samsung AKG",
        precio: 5900,
        img: "./img/auriculares/auri samsung.jpeg",
    },
    {
        id: 14,
        nombre: "Auriculares headphone",
        cantidad: 1,
        desc: "Auriculares vincha",
        precio: 5900,
        img: "./img/auriculares/auri vincha.jpg",
    },
    {
        id: 15,
        nombre: "Auriculares manos libres",
        cantidad: 1,
        desc: "Auriculares manos libres colores pasteles",
        precio: 1490,
        img: "./img/auriculares/auri.jpg",
    },

];


let carrito = []


const contenedor = document.querySelector('#contenedor');
const carritoContenedor = document.querySelector('#carritoContenedor');
const vaciarCarrito = document.querySelector('#vaciarCarrito');
const precioTotal = document.querySelector('#precioTotal');
const procesarCompra = document.querySelector('#procesarCompra');


document.addEventListener('DOMContentLoaded',() =>{
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    mostrarCarrito();
})


stockAuriculares.forEach((prod) =>{
    const {id, nombre, precio, desc, img, cantidad} = prod;
    contenedor.innerHTML +=  `
    <div class="card" style="width: 18rem;">
    <img src="${img}" class="card-img-top" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio:${precio}</p>
        <p class="card-text">${desc}</p>

        <button onclick="agregarProducto(${id})" class="btn btn-success">Comprar</button>
    </div>
    </div>
        `
});

procesarCompra.addEventListener('click', () =>{
    if (carrito.length === 0){
        Swal.fire({
            title:"Tu carrito esta vacio",
            text:"Compra algo para continuar",
            icon:"error",
            confirmButtonText:"Aceptar",
        
        })
    }else {
       location.href="compra.html" 
    }
});

vaciarCarrito.addEventListener('click', () =>{
    carrito.length = [];
    mostrarCarrito();
})

function agregarProducto(id){

    const existe = carrito.some(prod => prod.id === id)

    if (existe){
        const prod = carrito.map(prod => {
            if(prod.id === id){
                prod.cantidad ++
            }
        })
    }else {
        const item = stockAuriculares.find((prod) => prod.id === id)
        carrito.push(item);
    }

    
    mostrarCarrito(); 
}

const mostrarCarrito = () => {
    const offcanvasBody = document.querySelector('.offcanvas .offcanvas-body');

    offcanvasBody.innerHTML = ''
    carrito.forEach((prod) => {
        const {id, nombre, img, desc,cantidad, precio} = prod
        offcanvasBody.innerHTML += `
        <div class="offcanvas-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>

        <div>
        <p>Producto:${nombre}</p>
        <p>Precio:${precio}</p>
        <p>Cantidad:${cantidad}</p>
        
        <button onclick="eliminarProducto(${id})" class="btn btn-outline-danger"> Eliminar producto</button>
        </div>

        `
    })

    if(carrito.length === 0){
        offcanvasBody.innerHTML = `
        <p class="text-center parrafo">¡Aún no agregaste nada!</p>
        `
    }

    carritoContenedor.textContent = carrito.length;

precioTotal.innerText = carrito.reduce((acumulador,prod) => acumulador + prod.cantidad * prod.precio , 0)

    guardarStorage();
}

function eliminarProducto(id){
    const productoId = id;
    carrito = carrito.filter((producto) => producto.id != productoId);
   mostrarCarrito();
}

function guardarStorage(){
    localStorage.setItem("carrito",JSON.stringify(carrito));
}