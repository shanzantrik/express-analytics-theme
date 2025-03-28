document.addEventListener('DOMContentLoaded', function () {
  const filters = document.querySelectorAll('.wp-block-express-analytics-case-studies__filters select');

  filters.forEach(filter => {
    filter.addEventListener('change', function () {
      const industry = this.value;
      const block = this.closest('.wp-block-express-analytics-case-studies');
      const grid = block.querySelector('.wp-block-express-analytics-case-studies__grid');

      // Show loading state
      grid.style.opacity = '0.5';
      grid.style.pointerEvents = 'none';

      // Fetch filtered case studies
      wp.apiFetch({
        path: `/wp/v2/case-study?industry=${industry}&_embed=true`,
      }).then(posts => {
        grid.innerHTML = '';

        posts.forEach(post => {
          const item = document.createElement('div');
          item.className = 'wp-block-express-analytics-case-studies__item';

          if (post._embedded?.['wp:featuredmedia']?.[0]) {
            const image = document.createElement('img');
            image.className = 'wp-block-express-analytics-case-studies__image';
            image.src = post._embedded['wp:featuredmedia'][0].source_url;
            image.alt = post._embedded['wp:featuredmedia'][0].alt_text || '';
            item.appendChild(image);
          }

          const title = document.createElement('h3');
          title.className = 'wp-block-express-analytics-case-studies__item-title';
          title.innerHTML = post.title.rendered;
          item.appendChild(title);

          const excerpt = document.createElement('div');
          excerpt.className = 'wp-block-express-analytics-case-studies__item-excerpt';
          excerpt.innerHTML = post.excerpt.rendered;
          item.appendChild(excerpt);

          const link = document.createElement('a');
          link.className = 'wp-block-express-analytics-case-studies__link';
          link.href = post.link;
          link.textContent = 'Read Case Study';
          item.appendChild(link);

          grid.appendChild(item);
        });

        // Restore grid state
        grid.style.opacity = '1';
        grid.style.pointerEvents = 'auto';

        // Animate new items
        const items = grid.querySelectorAll('.wp-block-express-analytics-case-studies__item');
        items.forEach((item, index) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }).catch(error => {
        console.error('Error fetching case studies:', error);
        grid.style.opacity = '1';
        grid.style.pointerEvents = 'auto';
      });
    });
  });
});
