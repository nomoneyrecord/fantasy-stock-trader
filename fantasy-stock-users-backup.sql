PGDMP  )                    |           fantasy_stock_trader    16.0    16.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24576    fantasy_stock_trader    DATABASE     v   CREATE DATABASE fantasy_stock_trader WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
 $   DROP DATABASE fantasy_stock_trader;
                postgres    false            �            1259    24578    user    TABLE     �   CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying(80) NOT NULL,
    password character varying(128)
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    24577    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    216                       0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    215            z           2604    24581    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216                      0    24578    user 
   TABLE DATA           5   COPY public."user" (id, email, password) FROM stdin;
    public          postgres    false    216   �                  0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 15, true);
          public          postgres    false    215            |           2606    24585    user user_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_email_key;
       public            postgres    false    216            ~           2606    24583    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    216               �  x�m�ǲ�h�<�#?�� I2"�ԝH�C����Vw�}��~�jm��~��;�ˣz�16��� ���R��m����V�K�����h�{$by��A��k�k�:酮B�o��O�F�#�I�g���t�載�8U��:Ò�.U�l3FJղ��O*��	�0�K�x�c���qjc�B2aU~���Ӿ��b��Fmsfh��������u�^쐸��M���ӤS��\�9����銡�C���{�?���Tb�eA�3 V�۩����*z������A���#̸���!j�5��O���`b�9�b�P��c`�%u/�J�Ca�[H��k���+^T�_j�V��<w�ZM�g,p��\�3����ʰ��	�yȐ���B�{��+��zF��Gܶ�}T0���$��	V��i���U�H�Zhr$�]���û>�V�����Pt��X�/���V��K�&��e��%m$b��Z����?��n�;v�ӎ���l��,�~��llO��)G@*̟�������ë>� [qN�x����F&�ޏ&���P���}�H���ˑ�#��� ��~Z��4eYs~�hB���B��?C�o�O�E�m���]!��-�'v�</�}|���zS�+�9��l;W�ne=��l�k17,��FL�dB�xc�O,�w)��X�R!�{�6+�;Ez��=m 2��J�q�(8�+�� �/V�OG     