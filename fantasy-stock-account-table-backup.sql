PGDMP  3                    |           fantasy_stock_trader    16.0    16.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24576    fantasy_stock_trader    DATABASE     v   CREATE DATABASE fantasy_stock_trader WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
 $   DROP DATABASE fantasy_stock_trader;
                postgres    false            �            1259    32769    account    TABLE     ~   CREATE TABLE public.account (
    id integer NOT NULL,
    balance double precision NOT NULL,
    user_id integer NOT NULL
);
    DROP TABLE public.account;
       public         heap    postgres    false            �            1259    32768    account_id_seq    SEQUENCE     �   CREATE SEQUENCE public.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.account_id_seq;
       public          postgres    false    218                       0    0    account_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;
          public          postgres    false    217            z           2604    32772 
   account id    DEFAULT     h   ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);
 9   ALTER TABLE public.account ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218                      0    32769    account 
   TABLE DATA           7   COPY public.account (id, balance, user_id) FROM stdin;
    public          postgres    false    218   �                  0    0    account_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.account_id_seq', 11, true);
          public          postgres    false    217            |           2606    32774    account account_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.account DROP CONSTRAINT account_pkey;
       public            postgres    false    218            }           2606    32775    account account_user_id_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);
 F   ALTER TABLE ONLY public.account DROP CONSTRAINT account_user_id_fkey;
       public          postgres    false    218               M   x�=��	�0C�okc%�k��?G)%�_G 
�K�2p.[�Ѯ�n�D�9&j���ڌr�å��-C�x�|     