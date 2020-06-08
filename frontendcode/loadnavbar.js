 $.get("navbar.php", function(data){
     $("#nav-placeholder").replaceWith(data);
 });
 