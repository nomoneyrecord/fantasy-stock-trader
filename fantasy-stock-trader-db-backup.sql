PGDMP                      |           fantasy_stock_trader    16.0    16.0     !           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            "           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            #           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            $           1262    24576    fantasy_stock_trader    DATABASE     v   CREATE DATABASE fantasy_stock_trader WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
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
       public          postgres    false    218            %           0    0    account_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;
          public          postgres    false    217            �            1259    32781    stock_holdings    TABLE     �   CREATE TABLE public.stock_holdings (
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
       public          postgres    false    220            &           0    0    stock_holdings_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.stock_holdings_id_seq OWNED BY public.stock_holdings.id;
          public          postgres    false    219            �            1259    24578    user    TABLE     �   CREATE TABLE public."user" (
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
       public          postgres    false    216            '           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    215            ~           2604    32772 
   account id    DEFAULT     h   ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);
 9   ALTER TABLE public.account ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218                       2604    32784    stock_holdings id    DEFAULT     v   ALTER TABLE ONLY public.stock_holdings ALTER COLUMN id SET DEFAULT nextval('public.stock_holdings_id_seq'::regclass);
 @   ALTER TABLE public.stock_holdings ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            }           2604    24581    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216                      0    32769    account 
   TABLE DATA           7   COPY public.account (id, balance, user_id) FROM stdin;
    public          postgres    false    218   �                 0    32781    stock_holdings 
   TABLE DATA           G   COPY public.stock_holdings (id, symbol, quantity, user_id) FROM stdin;
    public          postgres    false    220                    0    24578    user 
   TABLE DATA           5   COPY public."user" (id, email, password) FROM stdin;
    public          postgres    false    216   z       (           0    0    account_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.account_id_seq', 11, true);
          public          postgres    false    217            )           0    0    stock_holdings_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.stock_holdings_id_seq', 13, true);
          public          postgres    false    219            *           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 15, true);
          public          postgres    false    215            �           2606    32774    account account_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.account DROP CONSTRAINT account_pkey;
       public            postgres    false    218            �           2606    32786 "   stock_holdings stock_holdings_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.stock_holdings
    ADD CONSTRAINT stock_holdings_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.stock_holdings DROP CONSTRAINT stock_holdings_pkey;
       public            postgres    false    220            �           2606    24585    user user_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_email_key;
       public            postgres    false    216            �           2606    24583    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    216            �           2606    32775    account account_user_id_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);
 F   ALTER TABLE ONLY public.account DROP CONSTRAINT account_user_id_fkey;
       public          postgres    false    218    3459    216            �           2606    32787 *   stock_holdings stock_holdings_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock_holdings
    ADD CONSTRAINT stock_holdings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);
 T   ALTER TABLE ONLY public.stock_holdings DROP CONSTRAINT stock_holdings_user_id_fkey;
       public          postgres    false    220    216    3459               M   x�=��	�0C�okc%�k��?G)%�_G 
�K�2p.[�Ѯ�n�D�9&j���ڌr�å��-C�x�|         K   x�%�1�0���c��A�������l��;|B+�dOV�G�m��2V!Q���v�*ͱ��)O~o�/�2         �  x�m�ǲ�h�<�#?�� I2"�ԝH�C����Vw�}��~�jm��~��;�ˣz�16��� ���R��m����V�K�����h�{$by��A��k�k�:酮B�o��O�F�#�I�g���t�載�8U��:Ò�.U�l3FJղ��O*��	�0�K�x�c���qjc�B2aU~���Ӿ��b��Fmsfh��������u�^쐸��M���ӤS��\�9����銡�C���{�?���Tb�eA�3 V�۩����*z������A���#̸���!j�5��O���`b�9�b�P��c`�%u/�J�Ca�[H��k���+^T�_j�V��<w�ZM�g,p��\�3����ʰ��	�yȐ���B�{��+��zF��Gܶ�}T0���$��	V��i���U�H�Zhr$�]���û>�V�����Pt��X�/���V��K�&��e��%m$b��Z����?��n�;v�ӎ���l��,�~��llO��)G@*̟�������ë>� [qN�x����F&�ޏ&���P���}�H���ˑ�#��� ��~Z��4eYs~�hB���B��?C�o�O�E�m���]!��-�'v�</�}|���zS�+�9��l;W�ne=��l�k17,��FL�dB�xc�O,�w)��X�R!�{�6+�;Ez��=m 2��J�q�(8�+�� �/V�OG     