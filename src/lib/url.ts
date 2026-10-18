// Builds a link that works both on your computer and on GitHub Pages,
// where the site may live in a sub-folder like /portfolio-site/.
export function url(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return `${base}/${path.replace(/^\//, '')}`;
}

// Turns a YouTube link into its video id.
export function youtubeId(link: string) {
  const m = link.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}
