PGDMP                      |           fantasy_stock_trader    16.0    16.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24576    fantasy_stock_trader    DATABASE     v   CREATE DATABASE fantasy_stock_trader WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
 $   DROP DATABASE fantasy_stock_trader;
                postgres    false            �            1259    32781    stock_holdings    TABLE     �   CREATE TABLE public.stock_holdings (
    id integer NOT NULL,
    symbol character varying(10) NOT NULL,
    quantity integer NOT NULL,
    user_id integer NOT NULL
);
 "   DROP TABLE public.stock_holdings;
       public         heap    postgres    false            �            1259    32780    stock_holdings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stock_holdings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.stock_holdings_id_seq;
       public          postgres    false    220                       0    0    stock_holdings_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.stock_holdings_id_seq OWNED BY public.stock_holdings.id;
          public          postgres    false    219            z           2604    32784    stock_holdings id    DEFAULT     v   ALTER TABLE ONLY public.stock_holdings ALTER COLUMN id SET DEFAULT nextval('public.stock_holdings_id_seq'::regclass);
 @   ALTER TABLE public.stock_holdings ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220                      0    32781    stock_holdings 
   TABLE DATA           G   COPY public.stock_holdings (id, symbol, quantity, user_id) FROM stdin;
    public          postgres    false    220   �                  0    0    stock_holdings_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.stock_holdings_id_seq', 13, true);
          public          postgres    false    219            |           2606    32786 "   stock_holdings stock_holdings_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.stock_holdings
    ADD CONSTRAINT stock_holdings_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.stock_holdings DROP CONSTRAINT stock_holdings_pkey;
       public            postgres    false    220            }           2606    32787 *   stock_holdings stock_holdings_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock_holdings
    ADD CONSTRAINT stock_holdings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);
 T   ALTER TABLE ONLY public.stock_holdings DROP CONSTRAINT stock_holdings_user_id_fkey;
       public          postgres    false    220               K   x�%�1�0���c��A�������l��;|B+�dOV�G�m��2V!Q���v�*ͱ��)O~o�/�2     