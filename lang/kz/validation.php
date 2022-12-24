<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'Атрибут: қабылдануы керек.',
    'accepted_if' => 'Атрибут :басқа :мәнге тең болған кезде қабылдануы керек.',
    'active_url' => 'Атрибут: жарамды URL мекенжайы емес.',
    'after' => 'Атрибут :келесі күн болуы керек: күн.',
    'after_or_equal' => 'Атрибут :келесі күн болуы керек немесе оған тең болуы керек: күн.',
    'alpha' => 'Атрибут: тек әріптер болуы керек.',
    'alpha_dash' => 'Атрибут: тек әріптер, сандар, сызықшалар және астын сызу болуы керек.',
    'alpha_num' => 'Атрибут: тек әріптер мен сандар болуы керек.',
    'array' => 'Атрибут: массив болуы керек.',
    'before' => 'Атрибут: алдында күн болуы керек: күн.',
    'before_or_equal' => 'Атрибут: алдыңғы немесе оған тең күн болуы керек: күн.',
    'between' => [
        'array' => 'Атрибут:: min-ден: max-қа дейінгі элементтерді қамтуы керек.',
        'file' => 'Атрибут:: min-ден: Max килобайтқа дейін болуы керек.',
        'numeric' => 'Атрибут:: min-ден: max-қа дейін болуы керек.',
        'string' => 'Атрибут :таңбалар арасында болуы керек: min және: max.',
    ],
    'boolean' => 'Төлсипат өрісі: шын немесе жалған болуы керек.',
    'confirmed' => 'Төлсипатты растау: сәйкес келмейді.',
    'current_password' => 'Құпия сөз дұрыс емес.',
    'date' => 'Атрибут: жарамды күн емес.',
    'date_equals' => 'Атрибут: күні болуы керек :күн.',
    'date_format' => 'Атрибут: форматқа сәйкес келмейді: формат.',
    'declined' => 'Атрибут: қабылданбауы керек.',
    'declined_if' => 'Атрибут :басқа :мәнге тең болған кезде қабылданбауы керек.',
    'different' => 'Атрибут: және: басқа әр түрлі болуы керек.',
    'digits' => 'Атрибут: болуы керек: digits сандар.',
    'digits_between' => 'Атрибут: сандар арасында болуы керек :min және: max.',
    'dimensions' => 'Атрибут: жарамсыз кескін өлшемдері бар.',
    'distinct' => 'Өріс: атрибуттың қайталанатын мәні бар.',
    'doesnt_end_with' => 'Атрибут: келесі мәндердің бірімен аяқталмауы мүмкін::.',
    'doesnt_start_with' => 'Атрибут: келесі мәндердің бірінен басталмауы мүмкін::.',
    'email' => 'Атрибут: жарамды электрондық пошта мекенжайы болуы керек.',
    'ends_with' => 'Атрибут: келесі мәндердің бірімен аяқталуы керек::.',
    'enum' => 'Таңдалған атрибут: рұқсат етілмейді.',
    'exists' => 'Таңдалған атрибут: рұқсат етілмейді.',
    'file' => 'Атрибут: файл болуы керек.',
    'filled' => 'Өріс: атрибут маңызды болуы керек.',
    'gt' => [
        'array' => 'Атрибут : көп элементтерден тұруы керек: мәннен гөрі:.',
        'file' => 'Атрибут :артық болуы керек: килобайт мәні.',
        'numeric' => 'Атрибут: мәннен үлкен болуы керек:.',
        'string' => 'Атрибут: көбірек таңбалар болуы керек: мән.',
    ],
    'gte' => [
        'array' => 'Атрибут: құрамында болуы керек: мән элементтері немесе одан да көп.',
        'file' => 'Атрибут : мәннен үлкен немесе оған тең болуы керек: килобайт.',
        'numeric' => 'Атрибут: мәннен үлкен немесе оған тең болуы керек :.',
        'string' => 'Атрибут: таңбалардан үлкен немесе тең болуы керек: мән.',
    ],
    'image' => 'Атрибут: сурет болуы керек.',
    'in' => 'Таңдалған атрибут: рұқсат етілмейді.',
    'in_array' => 'Өріс: attribute жоқ :басқа.',
    'integer' => 'Атрибут: бүтін сан болуы керек.',
    'ip' => 'Атрибут: жарамды IP мекенжайы болуы керек.',
    'ipv4' => 'Атрибут: жарамды IPv4 мекенжайы болуы керек.',
    'ipv6' => 'Атрибут: жарамды IPv6 мекенжайы болуы керек.',
    'json' => 'Төлсипат: жарамды JSON жолы болуы керек.',
    'lt' => [
        'array' => 'Атрибут: элементтері аз болуы керек: мәні.',
        'file' => 'Атрибут: мәннен аз болуы керек: килобайт.',
        'numeric' => 'Атрибут :келесі мәннен аз болуы керек.',
        'string' => 'Атрибут :кішірек болуы керек: мән таңбалары.',
    ],
    'lte' => [
        'array' => 'Атрибут : артық элементтер болмауы керек: мән.',
        'file' => 'Атрибут : мәннен аз немесе оған тең болуы керек: килобайт.',
        'numeric' => 'Атрибут : мәннен аз немесе оған тең болуы керек :',
        'string' => 'Атрибут : таңбалардан аз немесе оған тең болуы керек :мән.',
    ],
    'mac_address' => 'Атрибут: жарамды MAC мекенжайы болуы керек.',
    'max' => [
        'array' => 'Атрибут: артық болмауы керек: max элементтер.',
        'file' => 'Атрибут: аспауы керек: max килобайт.',
        'numeric' => 'Атрибут : аспауы керек :max.',
        'string' => 'Атрибут : аспауы керек: max таңбалар.',
    ],
    'max_digits' => 'Атрибут: артық болмауы керек: max сандар.',
    'mimes' => 'Атрибут ::: values файл түрі болуы керек.',
    'mimetypes' => 'Атрибут ::: values файл түрі болуы керек.',
    'min' => [
        'array' => ' Атрибут : кем дегенде болуы керек: минималды элементтер.',
        'file' => 'Атрибут: кем дегенде болуы керек :min килобайт.',
        'numeric' => 'Атрибут : кем емес болуы керек: min.',
        'string' => 'Атрибут : кем дегенде болуы керек: минималды таңбалар.',
    ],
    'min_digits' => 'Атрибут : кем дегенде болуы керек: минималды сандар.',
    'multiple_of' => 'Атрибут: мәннің еселігі болуы керек :',
    'not_in' => ' таңдалған атрибут: жарамсыз.',
    'not_regex' => 'The :attribute format is invalid.',
    'numeric' => ' Атрибут: сан болуы керек.',
    'password' => [
        'letters' => ' Атрибут: кем дегенде бір әріп болуы керек.',
        'mixed' => 'Атрибут: кем дегенде бір бас әріп пен бір кіші әріп болуы керек.',
        'numbers' => 'Атрибут : кем дегенде бір сан болуы керек.',
        'symbols' => 'Атрибут: кем дегенде бір таңбадан тұруы керек.',
        'uncompromised' => 'Берілген атрибут: деректердің бұзылуынан пайда болды. Басқасын таңдаңыз: атрибут.',
    ],
    'present' => ' өріс: атрибут болуы керек.',
    'prohibited' => 'өріс :атрибут тыйым салынған.',
    'prohibited_if' => ' өріс: атрибут тыйым салынған кезде: басқа тең: мәні.',
    'prohibited_unless' => ' өріс: attribute тыйым салынады, егер :басқа :мәндерінде болмаса.',
    'prohibits' => 'өріс: attribute қатысуға тыйым салады: басқа.',
    'regex' => 'Формат: attribute қолайсыз.',
    'required' => 'өріс: attribute міндетті болып табылады.',
    'required_array_keys' => 'өрісінде:: мәндері үшін жазбалар болуы керек.',
    'required_if' => 'өріс: attribute қажет болғанда :басқа :мәнге тең.',
    'required_unless' => 'өріс: attribute қажет, егер :басқа :мәндерінде болмаса.',
    'required_with' => 'өріс: attribute қажет болған жағдайда: мәндер.',
    'required_with_all' => 'өріс: attribute қажет болған жағдайда: мәндер.  ',
    'required_without' => 'өріс: attribute болмаған кезде қажет: мәндер.',
    'required_without_all' => 'өріс: attribute ешқайсысы болмаған кезде қажет: мәндер.',
    'same' => 'Атрибут: және: басқалары сәйкес келуі керек.',
    'size' => [
        'array' => 'Атрибут :элементтерді қамтуы керек: size.',
        'file' => 'Атрибут: болуы керек :Килобайт өлшемі.',
        'numeric' => 'Атрибут: болуы керек :өлшемі.',
        'string' => ' Атрибут: болуы керек: таңбалардың өлшемі.',
    ],
    'starts_with' => ' Атрибут : келесілердің бірінен басталуы керек:: мәндер.',
    'string' => 'Атрибут: жол болуы керек.',
    'timezone' => 'Атрибут: рұқсат етілген уақыт белдеуі болуы керек.',
    'unique' => ' Атрибут: бұрыннан қолданылған.',
    'uploaded' => ' төлсипатты жүктеу мүмкін болмады :.',
    'url' => 'Атрибут: жарамды URL болуы керек.',
    'uuid' => 'Атрибут: жарамды UUID болуы керек.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];