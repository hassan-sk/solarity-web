import React from "react";

export type PostType =
  | "featured"
  | "announcement"
  | "normal"
  | "tweet"
  | "blockchainActivity";

export type AccountType = "user" | "dao" | "none";

export type TagType = "secondary" | "error" | "info" | "warning";

export type Tag = {
  title: string;
  type: TagType;
};
export type Post = {
  created_at?: Date;
  title: string;
  image?: string;
  time?: string;
  retweets?: number;
  subtitle?: Function | string;
  tags?: Tag[];
  likes: number;
  type: PostType;
  progress?: number;
  vr?: {
    imageUrl: string;
    featured: boolean;
    price?: number;
  };
  vr1?: {
    imageUrl: string;
    featured: boolean;
    price?: number;
  };
  vr2?: {
    imageUrl: string;
    featured: boolean;
    price?: number;
  };
  vr3?: {
    imageUrl: string;
    featured: boolean;
    price?: number;
  };
  vr4?: {
    imageUrl: string;
    featured: boolean;
    price?: number;
  };
  vr5?: {
    imageUrl: string;
    featured: boolean;
    price?: number;
  };
  vr6?: {
    imageUrl: string;
    featured: boolean;
    price?: number;
  };
  vr7?: {
    imageUrl: string;
    featured: boolean;
    price?: number;
  };
  vr8?: {
    imageUrl: string;
    featured: boolean;
    price?: number;
  };
  vr9?: {
    imageUrl: string;
    featured: boolean;
    price?: number;
  };
  vrmarket?: {
    imageUrl: string;
    featured: boolean;
    price?: number;
  };
  user: {
    avatar: string;
    name: string;
  };
};
