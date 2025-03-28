document.addEventListener('DOMContentLoaded', function () {
  const tabBlocks = document.querySelectorAll('.adminlte-multi-tabs-block');

  tabBlocks.forEach(block => {
    const tabLinks = block.querySelectorAll('.nav-link');
    const tabPanes = block.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all tabs and panes
        tabLinks.forEach(tab => tab.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to clicked tab and corresponding pane
        const tabIndex = this.getAttribute('data-tab');
        this.classList.add('active');
        tabPanes[tabIndex].classList.add('active');
      });
    });
  });
});
