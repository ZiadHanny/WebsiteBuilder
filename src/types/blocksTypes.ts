// types.ts
export interface HeaderData {
  Logo: string;
  links: { label: string; href: string }[];
  button: string;
  styles?: {
        backgroundColor: string;
        textColor: string;
        borderColor: string;
    };
}

export interface HeroData {
    title: string;
    subtitle: string;
    styles?: {
        backgroundColor: string;
        textColor: string;
        borderColor: string;
    };
}

export interface FooterData {
  text: string;
  links: { label: string; href: string }[];
   styles?: {
        backgroundColor: string;
        textColor: string;
        borderColor: string;
    };
}
