export default function BackgroundEffect() {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed w-[2000px] h-[2000px] hidden dark:md:block -bottom-[60rem] dark:opacity-10 transform scale-y-[2.5] -rotate-12 -left-[55rem] -z-10"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--nextui-secondary-100)) 0%, rgba(0,0,0,0) 20%)',
          animation: 'pulse 25s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      ></div>
      <div
        aria-hidden="true"
        className="fixed w-[2000px] bg-primary-100 h-[2000px] hidden dark:md:block dark:opacity-10 -bottom-[40rem] transform scale-y-[2] rotate-12 -right-[45rem] -z-10"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--nextui-primary-100)) 0%, rgba(0,0,0,0) 25%)',
          animation: 'pulse 20s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      ></div>
    </>
  );
}
