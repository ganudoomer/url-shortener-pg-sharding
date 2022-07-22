for (let index = 101; index < 1000; index++) {
  fetch("http://localhost:3000/?url=https://wikipedia.com/asdfafdsa" + index, {
    method: "POST",
  }).then((a) => {
    a.json().then(console.log);
  });
}

fetch("http://localhost:3000/?urlId=afsdfasd").then((a) => {
  a.json().then(console.log);
});

// {urlId: 'LlGur', server: '5434', url: 'https://wikipedia.com/asdfafdsa959'}
// {urlId: 'Z+MLG', server: '5434', url: 'https://wikipedia.com/asdfafdsa960'}
// {urlId: 'XI27H', server: '5432', url: 'https://wikipedia.com/asdfafdsa961'}
