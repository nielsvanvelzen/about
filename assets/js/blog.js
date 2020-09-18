// Utility function to format dates
function formatDate(date) {
	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

function clearBlogEntries() {
	const elements = document.querySelectorAll('[data-blog-post-list] [data-blog-post-item]');
	for (const element of elements) {
		element.parentElement.removeChild(element);
	}
}

function addBlogEntry({ id, title, date, link }) {
	// Dirty HTML builder for blog entries
	const postEl = document.createElement('li');
	postEl.dataset.blogPostItem = id.toString();
	const postTitleEl = document.createElement('a');
	postTitleEl.classList.add('title');
	postTitleEl.href = link;
	postTitleEl.textContent = title;
	postEl.appendChild(postTitleEl);
	const postDateEl = document.createElement('span');
	postDateEl.classList.add('date');
	postDateEl.textContent = formatDate(date);
	postEl.appendChild(postDateEl);

	// Insert before the "more posts" link
	const moreEl = document.querySelector('[data-blog-post-more]');
	moreEl.parentElement.insertBefore(postEl, moreEl);
}

async function updateBlog() {
	// Feed url
	const feed = 'https://blog.nielsvanvelzen.me/feed.xml';
	// Download and parse as XML
	const txt = await fetch(feed).then(r => r.text());
	const doc = new DOMParser().parseFromString(txt, 'application/xml');

	// Clear current items
	clearBlogEntries();
	
	// Counter to show a maximum of 5 posts
	let i = 0;
	for (const item of doc.querySelectorAll('item')) {
		i++;
		// Limited to show just five posts
		if (i > 5) break;

		// Get relavant information
		const title = item.querySelector('title').textContent;
		const date = new Date(item.querySelector('pubDate').textContent);
		const link = item.querySelector('link').textContent;

		// Add entry
		addBlogEntry({ id: i, title, date, link });
	}
}

// Update blog info on load
window.addEventListener('load', () => {
	updateBlog();
});