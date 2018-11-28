/**
 * Created by RAIN on 30-04-2018.
 */

function zoom(img)
{
    var nav= document.getElementById("nav");
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    var data= document.getElementById("data");
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = data.innerHTML;
    nav.style.visibility="hidden";
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        nav.style.visibility="visible";
        modal.style.display = "none";
    }
}