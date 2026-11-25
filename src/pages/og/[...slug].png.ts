import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import siteConfig from '../../data/site-config';
import { renderOgPng } from '../../utils/og';

type OgProps = {
  title: string;
  subtitle?: string;
  category?: string;
};

export async function getStaticPaths() {
  const posts = await getCollection('yazilar');
  const duygular = await getCollection('duygular');

  const staticCards: { params: { slug: string }; props: OgProps }[] = [
    {
      params: { slug: 'anasayfa' },
      props: {
        title: siteConfig.hero.headline,
        subtitle: siteConfig.hero.intro,
        category: 'Tuğba — Kişisel ve PDR günlüğü'
      }
    },
    {
      params: { slug: 'yazilar' },
      props: {
        title: 'Yazılar',
        subtitle: 'Rehberlik notları, kişisel denemeler, kitap ve sinema okumaları.',
        category: 'Arşiv'
      }
    },
    {
      params: { slug: 'duygular' },
      props: {
        title: 'Duygular sözlüğü',
        subtitle: 'Hissettiğimiz ama çoğu zaman tek kelimeyle anlatamadığımız hâller için kısa defter kayıtları.',
        category: 'Sözlük'
      }
    },
    {
      params: { slug: 'aklimda-kalanlar' },
      props: {
        title: 'Aklımda kalanlar',
        subtitle: 'Kurşun kalemle altı çizilen kitap sayfaları, okuma kulesi ve biriken cümleler.',
        category: 'Seçki'
      }
    },
    {
      params: { slug: 'kitaplik' },
      props: {
        title: 'Kitaplık',
        subtitle: 'İz bırakan kitaplar, filmler ve öğrenciler ile veliler için seçilmiş öneriler.',
        category: 'Okuma listesi'
      }
    },
    {
      params: { slug: 'rehberlik' },
      props: {
        title: 'Rehberlik köşesi',
        subtitle: 'Öğrenciler ve veliler için mesleki notlar, haftalık çalışma tablosu ve anonim soru kutusu.',
        category: 'Rehberlik'
      }
    },
    {
      params: { slug: 'calisma-tablosu' },
      props: {
        title: 'Haftalık ders çalışma tablosu',
        subtitle: 'Ekranda doldurabileceğin, boş ya da dolu olarak A4 çıktısı alabileceğin sade haftalık plan.',
        category: 'Rehberlik'
      }
    },
    {
      params: { slug: 'hakkimda' },
      props: {
        title: 'Hakkımda',
        subtitle: 'Rehber öğretmen, okur ve yarım kalan cümlelerin biriktiricisi.',
        category: 'Tanıtım'
      }
    }
  ];

  const postCards = posts.map((post) => ({
    params: { slug: `yazilar/${post.id}` },
    props: {
      title: post.data.title,
      subtitle: post.data.excerpt,
      category: post.data.category
    }
  }));

  const duyguCards = duygular.map((entry) => ({
    params: { slug: `duygular/${entry.id}` },
    props: {
      title: entry.data.term,
      subtitle: `“${entry.data.handwrittenLine}”`,
      category: 'Duygular sözlüğü'
    }
  }));

  return [...staticCards, ...postCards, ...duyguCards];
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng(props as OgProps);
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
};
