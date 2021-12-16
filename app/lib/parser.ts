/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 11 2021
 * @ Time: 23:14
 */

import type { PostEntity } from '~/generated';
import { PublicationState } from '~/generated';

import type { ImageFormats, ParsedPost, SlugAndPreview } from '~/types';

export function parsePost({ id, attributes }: PostEntity): ParsedPost {
  const cover: ImageFormats = {
    large: attributes?.cover.data?.attributes?.formats['large'] || null,
    medium: attributes?.cover.data?.attributes?.formats['medium'] || null,
    small: attributes?.cover.data?.attributes?.formats['small'] || null,
    thumbnail: attributes?.cover.data?.attributes?.formats['thumbnail'] || null,
  };

  const avatar: ImageFormats = {
    large:
      attributes?.author?.data?.attributes?.avatar.data?.attributes?.formats[
        'large'
      ] || null,
    medium:
      attributes?.author?.data?.attributes?.avatar.data?.attributes?.formats[
        'medium'
      ] || null,
    small:
      attributes?.author?.data?.attributes?.avatar.data?.attributes?.formats[
        'small'
      ] || null,
    thumbnail:
      attributes?.author?.data?.attributes?.avatar.data?.attributes?.formats[
        'thumbnail'
      ] || null,
  };

  return {
    id: id || null,
    date: attributes?.date || null,
    slug: attributes?.slug || null,
    title: attributes?.slug || null,
    content: attributes?.content || null,
    cover,
    excerpt: attributes?.excerpt || null,
    author: {
      avatar,
      name: attributes?.author?.data?.attributes?.name || null,
    },
  };
}

export function parsePosts(posts: PostEntity[] | undefined): ParsedPost[] {
  if (posts) {
    return posts.map((post) => parsePost(post));
  }

  return [];
}

export function getQueryVariables({ slug, preview }: SlugAndPreview) {
  return typeof slug === 'string'
    ? {
        slug,
        state: preview ? PublicationState.Preview : PublicationState.Live,
      }
    : {
        slug: '',
        state: preview ? PublicationState.Preview : PublicationState.Live,
      };
}
