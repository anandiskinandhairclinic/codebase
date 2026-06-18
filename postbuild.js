import fs from 'fs';
import path from 'path';

try {
  const src = path.join(process.cwd(), 'dist', 'client');
  const dest = path.join(process.cwd(), 'dist');

  if (fs.existsSync(src)) {
    // Copy all contents of dist/client to dist
    fs.cpSync(src, dest, { recursive: true });
    console.log('Successfully copied dist/client to dist');
  } else {
    console.warn('Source directory dist/client does not exist.');
  }
} catch (err) {
  console.error('Error during postbuild execution:', err);
  process.exit(1);
}
