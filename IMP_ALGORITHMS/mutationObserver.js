// Select the target nodes
var targetNodes = document.querySelectorAll('.observe-me');

// Create a MutationObserver instance
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log('Changes observed on:', mutation.target);
  });
});

// Configure the observer to watch for changes in child nodes
var config = { childList: true, subtree: true };

// Start observing each target node for configured mutations
targetNodes.forEach(function(node) {
  observer.observe(node, config);
});
