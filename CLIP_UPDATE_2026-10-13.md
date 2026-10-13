# CLIP! 1.0.0 — Software & News update

**Version:** 13 October 2026

## Pages edited
- `softwares.html` and `es/softwares.html`: added a **Plugins** section featuring CLIP! 1.0.0 under Moleku, with release, repository, and installation guide links.
- `news.html` and `es/news.html`: inserted a new CLIP! 1.0.0 launch entry as the most recent news item.
- `assets/css/style.css`: added responsive styles for the plugin showcase and news preview.
- `DATA_SOURCES.md`: added scientific and repository provenance.

## CLIP! source links
- Repository: https://github.com/SBBCS-UFRO/CLIP
- Verified release: https://github.com/SBBCS-UFRO/CLIP/releases/tag/1.0.0
- Installation: https://github.com/SBBCS-UFRO/CLIP/blob/main/INSTALLATION.md
- Official logo: https://raw.githubusercontent.com/SBBCS-UFRO/CLIP/main/long_logo.png

**Important:** the official logo is referenced from the public CLIP! GitHub repository, not bundled as a binary image. A plain-text `CLIP!` fallback is shown if the remote image cannot be loaded. To make the site fully self-contained, download the same `long_logo.png` from the repository into `assets/img/software/clip-logo.png` and replace the two external image `src` URLs in the Software and News pages (both languages) with language-relative local paths.

**Compatibility note:** CLIP! 1.0.0 is documented as experimental, validated with ChimeraX 1.12 on macOS; operation on Windows/Linux remains to be validated. New analyses require separate PLIP dependencies in a Python environment.

To deploy: replace all files in the root of your GitHub Pages repository with the contents of `sbbcs-ufro-expanded/`, preserving folders and `.nojekyll`.
