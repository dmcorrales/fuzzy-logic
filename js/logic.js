/* -----------------------------------------------
/* Autores : Daniel Corrales, Camilo Novoa
/* Proyecto final para logica DIFUSA
/* ----------------------------------------------- */
var valores=new Array();
var letras = ["A","B","C","D","E","F","G","H","K","L","M","N","O"];
var  puntos;
var c = document.getElementById("grafos");
var ctx = c.getContext("2d");
class Punto{
    constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }
    
    
    darPosX(){
        return this.posX;
    }
    
    
    darPosY(){
        return this.posY;
    }
    
}



/************************************************************\
*Verifico si los campos estan correctos.
\************************************************************/
function verify(){
    var nTamanio = document.getElementById("TAMANIO").value;
    if(nTamanio == "" || nTamanio == null){
        Alert.render("Completar datos","Por favor, completar todos los campos.",0)
    }
    else if(nTamanio <= 1 || nTamanio > 5){
        Alert.render("Error","El numero de filas/columas debe tener un intervalo entre 2 y 5.",0)
    }
    else{
        Alert.render("Ingreso","Ingresa datos<br>Filas y columnas, cada una de las casillas tiene índice de pertenencia (>0 & <1)",nTamanio)
    }
    
}


/************************************************************\
* Generacion de los datos rand
\************************************************************/
function generarRand(){
    return Math.random() * (200 - 100) + 100;
}



/**
GRAFICOS
*/

/************************************************************\
* ME ENCARGO DE PINTAR
\************************************************************/
function pintar(tamanio){
    puntos= new Punto;
    console.log(valores.length);
    
    //ATRIBUTOS
    
    // posicion default de los puntos
    var posicionPuntoX=c.width/2;
    var poiscionPuntoY=c.height/2;
    
    // Asigno la posicion a los puntos principales
    for(var k = 0; k<tamanio; k++){
        console.log(tamanio+" "+ k);
        
        if(k>0 && k%2!=0){
            posicionPuntoX = puntos[k-1].darPosX()+generarRand();
            poiscionPuntoY = puntos[k-1].darPosY()+generarRand();
        }
        else if(k>0){
            posicionPuntoX = puntos[k-1].darPosX()-generarRand();
            poiscionPuntoY = puntos[k-1].darPosY()-generarRand();
        }
        
        puntos[k] = new Punto(posicionPuntoX, poiscionPuntoY);
        
        ctx.fillStyle = "#DA8C35";  //
        ctx.fillText(letras[k],puntos[k].darPosX(),puntos[k].darPosY()-10);
        ctx.fillStyle = "#ff2626"; //
        ctx.beginPath(); // Iniciamos trazo
        ctx.arc(puntos[k].darPosX(),puntos[k].darPosY(),5,0,Math.PI*2, true);
        ctx.fill();
    }
    
    //Dirijo la asignacion de asociaciones
    asignarRectas(tamanio);
    
}



/************************************************************\
* Relacion entre puntos, junto a sus pertenencias.
\************************************************************/
function asignarRectas(tamanio){
    var sumamos = 0;
    for(var i =0; i<tamanio; i++){
        for(var j = 0; j<tamanio; j++){
            //Si hay asociacion
            if(valores[i][j]>0){
                ctx.beginPath();
                ctx.moveTo(puntos[i].darPosX(), puntos[i].darPosY());
                ctx.lineTo(puntos[j].darPosX(), puntos[j].darPosY());
                ctx.fillStyle = "#000000";  //
                sumamos += 10;
                ctx.fillText("("+letras[i] + "," +letras[j]+ "): "+valores[i][j],5,sumamos);
                
                ctx.stroke();
                ctx.closePath();// me alisto para realizar otra parte del dibujo
            }
            
        }
        
    }
    
}



/**
BOTONES
*/

/************************************************************\
* Creacion de botones
\************************************************************/
function crearMatrizBotones(tamX){
    limpioBotones();
    //Defino tamaño según la cantidad
    var contenedor = document.getElementById("defineMatriz");
    contenedor.setAttribute("style","width:"+tamX*55+"px; height:"+tamX*30+"px; text-align:center; align-content:center; margin:0 auto; border-top:5px; margin-top:5px;");
    
    for(var i=0; i<tamX; i++){
        for(var j = 0; j<tamX; j++){
            var item = document.createElement("INPUT");
            item.setAttribute("type","number");
            item.setAttribute("id","n"+i+""+j);
            item.setAttribute("min",0);
            item.setAttribute("max",1);
            item.setAttribute("required","required");
            item.setAttribute("style","width:50px; height:20px");
            document.getElementById("listadoMatriz").appendChild(item);
            
        }
        
    }
    
    
}


/************************************************************\
* Limpio Botones
\************************************************************/
function limpioBotones(){
    var listado = document.getElementById("listadoMatriz");
    if(listado.hasChildNodes() || listado!=null){
        listado.innerHTML ="";
    }
    
}




/************************************************************\
* EXTENSIONES - Alert
\************************************************************/
function CustomAlert(){
    limpioBotones();
    this.render = function(title,dialog,arraylvl){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (550 * .5)+"px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = title;
        document.getElementById('dialogboxbody').innerHTML = dialog;
        
        if(arraylvl>0){
            crearMatrizBotones(arraylvl);
            document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.llenarDatos('+arraylvl+')">Guardar</button> <button onclick="Alert.ok()">Cerrar</button>';
        }
        else{
            document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">Cerrar</button> ';
        }
        
        
        this.llenarDatos= function(tamX){
            var bool = false;
            //Cierro la alerta
            for(i=0; i<tamX && bool==false; i++){
                for(j=0; j<tamX && bool ==false; j++){
                    let num = document.getElementById("n"+i+j);
                    if(num.value < 0 || num.value > 1){
                        alert("Los valores no pueden ser (<0 || >1)");
                        bool = true;
                    }
                    
                }
                
            }
            
            if(bool==false){
                Alert.ok();
                Alert.comprobacion(tamX);
            }
            
        }
        
        
        this.comprobacion = function(tamX){
            //Empiezo a comprobar
            for(var l=0; l < tamX;l++){
                valores[l]= new Array();
                for(var k=0; k<tamX; k++){
                    valores[l][k]=(document.getElementById("n"+l+""+k).value);
                    console.log(valores,l+""+k);
                }
                
            }
            
            ctx.clearRect(0, 0, c.width, c.height);
            pintar(tamX);
        }
        
        
        
    }
    
    this.ok = function(){
        
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
    
}

var Alert = new CustomAlert();