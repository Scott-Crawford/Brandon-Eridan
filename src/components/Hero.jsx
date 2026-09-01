import { site } from '../data/site.js'
import { responsive } from '../lib/img.js'

// Landing hero. The image is shown FULL (contained) so Brandon's full body is
// visible, over a blurred cover-fill of the same photo. Name + role sit in a
// centered bottom gradient bar.
export default function Hero() {
  const src = site.heroImages[0] || null

  return (
    <section className="hero" aria-label="Intro">
      <div className="hero-media">
        <div className="hero-slide is-active">
          <div
            className="hero-blur"
            style={{ backgroundImage: src ? `url("${src}")` : undefined }}
            aria-hidden="true"
          />
          {src && (
            <img
              className="hero-photo"
              {...responsive(src, '100vw')}
              alt=""
              decoding="async"
              fetchpriority="high"
            />
          )}
        </div>
      </div>

      <div className="hero-box">
        <h1 className="hero-name">{site.name}</h1>
        <p className="hero-role">{site.role}</p>
      </div>
    </section>
  )
}
