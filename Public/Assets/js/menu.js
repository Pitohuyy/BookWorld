// menu.js

// Créez une fonction pour générer le menu
function generateMenu() {
    // Créez un élément de menu
    const menu = document.createElement("ul");
    
    // Ajoutez des éléments de menu
    const homeMenuItem = createMenuItem("Home", "home.html");
    const productMenuItem = createMenuItem("product", "product.html");
    const aboutMenuItem = createMenuItem("About us", "about.html");
    const contactMenuItem = createMenuItem("Contact", "contact.html");
    const cartMenuItem = createMenuItem("Contact", "contact.html");

    
    // Ajoutez les éléments de menu à la liste
    menu.appendChild(homeMenuItem);
    menu.appendChild(aboutMenuItem);
    menu.appendChild(aboutMenuItem);
    menu.appendChild(contactMenuItem);
    menu.appendChild(cartMenuItem);
    
    // Ajoutez la liste de menu à un élément de la page (par exemple, une div avec l'ID "menu-container")
    const menuContainer = document.getElementById("menu-container");
    menuContainer.appendChild(menu);
  }
  
  // Fonction utilitaire pour créer un élément de menu
  function createMenuItem(text, link) {
    const menuItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.textContent = text;
    anchor.href = link;
    menuItem.appendChild(anchor);
    return menuItem;
  }
  
  // Appelez la fonction pour générer le menu lorsque la page est chargée
  window.addEventListener("load", generateMenu);
  