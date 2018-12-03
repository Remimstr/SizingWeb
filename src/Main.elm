port module Main exposing (main)

-- import Ports exposing (ImagePortData, fileSelected, fileContentRead)

import Browser
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input exposing (button)
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
    { id : String
    , mFile : Maybe File
    }


type alias File =
    { contents : String
    , filename : String
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { id = "FileId", mFile = Nothing }, Cmd.none )



-- UPDATE


type Msg
    = FileSelected
    | FileRead File


port fileSelected : String -> Cmd msg


port fileContentRead : (File -> msg) -> Sub msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FileSelected ->
            ( model
            , fileSelected model.id
            )

        FileRead data ->
            let
                newFile =
                    { contents = data.contents
                    , filename = data.filename
                    }
            in
            ( { model
                | mFile = Just newFile
              }
            , Cmd.none
            )



-- VIEW


textWithFont : Int -> Element msg
textWithFont size =
    el [ Font.size size ] (text "Sizing Web")


inputView : () -> Element msg
inputView _ =
    el [ Border.rounded 10, Border.width 1, Border.solid ] (text "1")


view : Model -> Browser.Document Msg
view model =
    { title = "Sizing Web"
    , body =
        [ Element.layout []
            (let
                filePreview =
                    case model.mFile of
                        Just i ->
                            viewFilePreview i

                        Nothing ->
                            el [] <| text <| ""
             in
             column [ width fill, height fill, centerX, alignTop, spacing 10, Background.color grey ]
                [ el [ alignTop, centerX, padding 50 ] (textWithFont 30)
                , el [ alignTop, centerX, padding 50 ] (inputView ())
                , Element.html <|
                    Html.input
                        [ type_ "file"
                        , id model.id
                        , on "change" <| Decode.succeed <| FileSelected
                        ]
                        []
                , filePreview
                ]
            )
        ]
    }


stepView : Int -> Element msg
stepView number =
    el [] <| text <| "This is a step" ++ fromInt number


viewFilePreview : File -> Element msg
viewFilePreview file =
    el [] <| text <| "I have your file!"


subscriptions : Model -> Sub Msg
subscriptions model =
    fileContentRead FileRead
