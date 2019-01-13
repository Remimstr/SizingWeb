port module Main exposing (main)

import Browser
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import File exposing (File)
import Graphics exposing (roundRect)
import Html exposing (Html)
import Html.Attributes exposing (id, style, type_, value)
import Html.Events exposing (on)
import Json.Decode as Decode
import Json.Encode exposing (Value)
import String exposing (fromInt)


main : Program () Model Msg
main =
    Browser.document { init = init, update = update, subscriptions = subscriptions, view = view }



-- GLOBALS


grey =
    Element.rgb 0.9 0.9 0.9


yellow =
    Element.rgb255 255 236 0



-- MODEL


type alias Model =
    { fileList : List File
    , postalCode : String
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { fileList = [], postalCode = "" }, Cmd.none )



-- UPDATE


type Msg
    = GotFiles (List File)
    | PostalCodeUpdated String
    | Submit


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotFiles files ->
            ( { model
                | fileList = files
              }
            , Cmd.none
            )

        PostalCodeUpdated postalCode ->
            ( { model
                | postalCode = postalCode
              }
            , Cmd.none
            )

        Submit ->
            ( model
            , Cmd.none
            )



-- VIEW


textWithFont : Int -> Element msg
textWithFont size =
    el [ Font.size size ] (text "Sizing Web")


inputView : Model -> Element Msg
inputView model =
    column [ spacing 10 ]
        [ row [ width fill ]
            [ Element.html <| roundRect "1"
            , el [ paddingXY 0 5 ] (text " Input:")
            ]
        , row [ width fill ]
            [ el [ paddingXY 24 0 ] (text "a) Your electricity usage for at least one month")
            , el [ alignRight ]
                (Element.html <|
                    Html.div []
                        [ Html.input
                            [ type_ "file"
                            , Html.Attributes.multiple True
                            , on "change" (Decode.map GotFiles filesDecoder)
                            ]
                            []
                        , Html.div [] [ Html.text (Debug.toString model) ]
                        ]
                )
            ]
        , row [ width fill ]
            [ el [ alignLeft, paddingXY 24 0 ] (text "b) Your postal code")
            , Input.text [ alignRight, width (px 100), height (px 8) ]
                { text = model.postalCode
                , label =
                    Input.labelHidden "Type a postal code"
                , placeholder =
                    Just
                        (Input.placeholder []
                            (text "123 456")
                        )
                , onChange = PostalCodeUpdated
                }
            ]
        , row [ width fill ]
            [ Input.button [ centerX, Border.solid, Border.width 1, Border.rounded 3, Border.glow yellow 1 ] { onPress = Nothing, label = text "Submit" } ]
        ]


processingView : () -> Element Msg
processingView _ =
    column []
        [ row []
            [ Element.html <| roundRect "2"
            , el [ paddingXY 0 5 ] (text " Processing:")
            ]
        , el [ paddingXY 24 10 ] (text "Estimated time until completion: 20 seconds")
        ]


view : Model -> Browser.Document Msg
view model =
    { title = "Sizing Web"
    , body =
        [ Element.layout []
            (column [ width fill, height fill, centerX, spacing 10, Background.color grey ]
                [ el [ alignTop, centerX ] (textWithFont 30)
                , el [ alignTop, centerX ] (inputView model)
                , el [ alignTop, centerX ] (processingView ())
                ]
            )
        ]
    }


filesDecoder : Decode.Decoder (List File)
filesDecoder =
    Decode.at [ "target", "files" ] (Decode.list File.decoder)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
