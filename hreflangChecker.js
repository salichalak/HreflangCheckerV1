javascript: (async () => {
    console.clear();

    const links = document.querySelectorAll('head > link[rel="alternate"]');
    const canonical = document.querySelector('head > link[rel="canonical"]');

    if (links.length === 0) {
        console.error('hreflangs not found!');
    }

    if (canonical) {
        let canonicalOutput = {};

        canonicalOutput.Canonical = canonical.href;
        canonicalOutput.isCorrect = canonical.href === window.location.href;

        console.table(canonicalOutput);
    } else {
        console.error('Canonical not found!');
    }

    let hreflangs = [];

    for (let link of links) {
        let current = {};

        current.hreflang = link.hreflang 
        ? link.hreflang 
        : 'Not found';

        current['URL'] = link.href 
        ? link.href 
        : 'Not found';

        let response = await fetch(link.href).then((res) => {
            return res;
        });

        current['Status Code'] = response.status;

        current["Redirected to"] = response.redirected === true 
        ? response.url 
        : null;

        hreflangs.push(current);
    }

    console.table(hreflangs);
})();
