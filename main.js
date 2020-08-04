// main variables to use
let theInput = document.querySelector('.get-repos input');
let getButton = document.querySelector('.get-button');
let reposData = document.querySelector('.show-data');

getButton.onclick=function(){
    getRepos();
};
// get repos function
function getRepos(){
    if(theInput.value==""){
        reposData.innerHTML="<span>Please Write Github Username</span>";
    }else{
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response)=> response.json())
        .then((repos)=>{
            // empty the container
            reposData.innerHTML='';
            // loop on repos
            repos.forEach(repo=>{
                // create the main div element
                let mainDiv=document.createElement('div');
                // create repo name text
                let repoName=document.createTextNode(repo.name);
                // append text to main div
                mainDiv.appendChild(repoName);
                // create repo url anchor
                let theUrl=document.createElement('a');
                // create repo url text
                let theUrlText=document.createTextNode('Visit');
                // append the url text
                theUrl.appendChild(theUrlText);
                // add href
                theUrl.href=`https://github.com/${theInput.value}/${repo.name}`;
                // set attribute blank
                theUrl.setAttribute('target','_blank');
                // append url anchor to main div
                mainDiv.appendChild(theUrl);
                // create stars count span
                let starsSpan = document.createElement('span');
                // create stars count text
                let starsText = document.createTextNode(`stars: ${repo.stargazers_count}`);
                // add stars count text to stars span
                starsSpan.appendChild(starsText);
                // append star count span to main div
                mainDiv.appendChild(starsSpan);
                // add class to main div
                mainDiv.className='repo-box';
                // append the main div to container
                reposData.appendChild(mainDiv);
            });
        });
    }
}
