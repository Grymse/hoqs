export default function BackgroundEffect() {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed w-[2000px] h-[2000px] hidden dark:md:block -bottom-[40rem] dark:opacity-60 transform scale-y-[2.5] -rotate-45 -left-[60rem] -z-10"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--nextui-secondary-100)) 0%, rgba(0,0,0,0) 35%)',
          animation: 'pulse 25s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      ></div>
      <div
        aria-hidden="true"
        className="fixed w-[2000px] bg-primary-100 h-[2000px] hidden dark:md:block dark:opacity-60 -top-[40rem] transform scale-y-[2] rotate-12 -right-[55rem] -z-10"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--nextui-primary-100)) 0%, rgba(0,0,0,0) 35%)',
          animation: 'pulse 20s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      ></div>
    </>
  );
}
