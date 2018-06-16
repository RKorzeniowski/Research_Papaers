function replaceImageWithIFrame(imageId, iframeURL) {
  let newiframe = $('<iframe>', {
    src: iframeURL,
    id: 'imageId',
    class: 'plotly-iframe',
    frameborder: 0,
    scrolling: 'no'
  })

  $(`#${imageId}`).replaceWith(newiframe)
}

window.onload = function () {
  if (window.innerWidth >= 700) {
    importScript('https://cdn.patricktriest.com/blog/images/posts/crypto-markets/plot_pages/plotly-1.29.3.min.js')
      .then(() => {
        // replaceImageWithIFrame('altcoin_prices_combined_0','https://cdn.patricktriest.com/blog/images/posts/crypto-markets/plot_pages/altcoin_prices_combined.html');
        replaceImageWithIFrame('kraken_price_plot', 'https://cdn.patricktriest.com/blog/images/posts/crypto-markets/plot_pages/kraken_price_plot.html');
        replaceImageWithIFrame('combined-exchanges-pricing', 'https://cdn.patricktriest.com/blog/images/posts/crypto-markets/plot_pages/combined-exchanges-pricing.html');
        replaceImageWithIFrame('combined-exchanges-pricing-clean', 'https://cdn.patricktriest.com/blog/images/posts/crypto-markets/plot_pages/combined-exchanges-pricing-clean.html');
        replaceImageWithIFrame('aggregate-bitcoin-price', 'https://cdn.patricktriest.com/blog/images/posts/crypto-markets/plot_pages/aggregate-bitcoin-price.html');
        replaceImageWithIFrame('altcoin_prices_combined', 'https://cdn.patricktriest.com/blog/images/posts/crypto-markets/plot_pages/altcoin_prices_combined.html');
        replaceImageWithIFrame('cryptocurrency-correlations-2016', 'https://cdn.patricktriest.com/blog/images/posts/crypto-markets/plot_pages/cryptocurrency-correlations-2016-v2.html');
        replaceImageWithIFrame('cryptocurrency-correlations-2017', 'https://cdn.patricktriest.com/blog/images/posts/crypto-markets/plot_pages/cryptocurrency-correlations-2017-v2.html');
      })
  }
}

/** Return a promise that will resolve once the provided script has been imported */
function importScript(url) {
  return new Promise((resolve, reject) => {
    // Add a script element to the DOM, to download the dependency library
    const script = document.createElement('script')
    script.src = url
    script.onload = function () {
      // Response the promise once the library is loaded
      resolve()
    }
    document.body.appendChild(script)
  })
}