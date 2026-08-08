/**
 * The crest artwork was drawn for light backgrounds — it carries a soft white
 * glow that turns murky on dark. `logo-dark.png` is the same mark with that
 * glow stripped, so each theme gets the version that reads cleanly.
 */
export default function Crest({
  className = '',
  alt = '',
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <>
      <img src="/logo.png" alt={alt} className={`${className} dark:hidden`} {...rest} />
      <img
        src="/logo-dark.png"
        alt={alt ? '' : undefined}
        aria-hidden={alt ? true : undefined}
        className={`${className} hidden dark:block`}
        {...rest}
      />
    </>
  )
}
