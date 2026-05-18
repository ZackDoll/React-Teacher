import './SectionHeader.css';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ eyebrow, title, sub, align = 'left' }: SectionHeaderProps) {
  return (
    <div className="section-header" data-align={align}>
      {eyebrow && <div className="section-header__eyebrow">{eyebrow}</div>}
      <h2 className="section-header__title">{title}</h2>
      {sub && <p className="section-header__sub">{sub}</p>}
    </div>
  );
}
